import CloseButton from '@/components/customElements/CloseButton';
import styles from './DevicesConfigs.module.css';
import TerminalCard from './terminalCard/TerminalCard';
import { useEffect, useState } from 'react';
import { useDevicesStore } from '@/zstore/devices.store';
import createIcon from '@/assets/public/createIcon.svg';
import CreateTerminal from './createTerminal/CreateTerminal';
import EditTerminal from './editTerminal/EditTerminal';

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}

enum DevicesProcessOtions{
  INITIAL= "INITIAL",
  CREATE= "CREATE",
  EDIT= "EDIT",
}




export default function DevicesConfig({ isOpen, onClose, children }: Props) {
  const [deviceProcess, setDeviceProcess] = useState<DevicesProcessOtions>(
    DevicesProcessOtions.INITIAL
  );
  const [selectedTerminal, setSelectedTerminal] = useState<any>(null);
  const devicesArray = useDevicesStore((state) => state.devices);
  const getDevices = useDevicesStore((state) => state.getDevices);

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <main className={styles.screen}>
      { deviceProcess === DevicesProcessOtions.CREATE && <CreateTerminal closeModal={onClose} onClose={()=>setDeviceProcess(DevicesProcessOtions.INITIAL)}></CreateTerminal>}
      { deviceProcess === DevicesProcessOtions.EDIT && <EditTerminal closeModal={onClose} onClose={()=>setDeviceProcess(DevicesProcessOtions.INITIAL)} item={selectedTerminal}></EditTerminal>}
      <section>
        <header>
        <CloseButton onClose={onClose}></CloseButton>
        <h4>{children}</h4>
        <button onClick={() => setDeviceProcess(DevicesProcessOtions.CREATE)}>
          <img src={createIcon} alt="create-icon" onClick={()=>setDeviceProcess(DevicesProcessOtions.CREATE)} />
          Crear terminal
        </button>
        </header>
        <div>
          {devicesArray?.map((item, index) => (
            <TerminalCard
              key={index + 1}
              item={item}
              id={index + 1}
              onClick={() => {
                setDeviceProcess(DevicesProcessOtions.EDIT)
                setSelectedTerminal(item)
              }}
              action={() => {}}
            ></TerminalCard>
          ))}
        </div>
      </section>
    </main>
  );
}
