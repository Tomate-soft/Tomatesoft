import styles from './groups.module.css';
import createIcon from '@/assets/public/createIcon.svg';
import searchIcon from '@/assets/public/searchIcon.svg';
import update from '@/assets/categorias/updateIcon.svg';
import enabledIcon from '@/assets/public/enabledIcon.svg';
import { useState } from 'react';
import { useAdditions } from '@/hooks/useAdditions';
import EditGroup from './editGroup';
import CreateGroup from './createGroup/createGroup';

export default function Groups() {
  enum ProcessGroup {
    EDIT = 'EDIT',
    CREATE = 'CREATE',
    INITIAl = 'INITIAL',
  }
  const [process, setprocess] = useState<ProcessGroup>(ProcessGroup.INITIAl);
  const [selectedGroup, setSelectedGroup] = useState({});
  const { groups } = useAdditions();

  return (
    <>
      {process === ProcessGroup.EDIT && (
        <EditGroup
          data={selectedGroup}
          action={() => setprocess(ProcessGroup.INITIAl)}
        />
      )}
      {process === ProcessGroup.CREATE && (
        <CreateGroup action={() => setprocess(ProcessGroup.INITIAl)} />
      )}
      <div className={styles.container}>
        <section className={styles.head}>
          <h2>Grupo de agregados</h2>
          <div>
            <button
              className={styles.btnHeadCreate}
              onClick={() => {
                setprocess(ProcessGroup.CREATE);
              }}
            >
              <img src={createIcon} alt="create-icon" />
              <span>Crear grupo</span>
            </button>
          </div>
        </section>
        <section className={styles.mainSection}>
          <div className={styles.mainHead}>
            <div className={styles.mainHeadLeft}>
              <span>Mostrar</span>
              <select name="" id="" className={styles.showSelect}>
                <option value="all">Todos</option>
                <option value="option-one">Option 1</option>
                <option value="optio-two">Option 2</option>
              </select>
              <span>grupos</span>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchBarTable}>
                <img
                  src={searchIcon}
                  alt="search-icon"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  className={styles.searchBarTableInput}
                  placeholder="Buscar grupo"
                />
              </div>
            </div>
          </div>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Grupo</th>
                <th>Cantidad de complementos</th>
                <th>Cantidad de modificadores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {groups?.map((group, index) => (
                <tr key={index}>
                  <td>{group?.groupName}</td>
                  <td>{group?.dishes?.length}</td>
                  <td>{group?.modifiers?.length}</td>
                  <td className={styles.buttonsContainer}>
                    <button
                      className={styles.actionButtonsFirstEnabled}
                      onClick={() => {
                        setprocess(ProcessGroup.EDIT), setSelectedGroup(group);
                      }}
                    >
                      <img src={update} alt="update-icon" />
                    </button>
                    <button className={styles.actionButtonsSecond}>
                      <img src={enabledIcon} alt="enabled-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFooter}></div>
        </section>
      </div>
    </>
  );
}
