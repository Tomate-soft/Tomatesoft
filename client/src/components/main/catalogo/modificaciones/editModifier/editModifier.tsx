import CloseButton from '@/components/customElements/CloseButton';
import styles from './editModifier.module.css';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { useEffect, useState } from 'react';
import { staticModifiers } from '@/lib/modifiers.lib';
import OnOffCheckBox from '@/components/customElements/onOffCheckBox/onOffCheckBox';

interface Props {
    onClose: () => void;
    action: (id: string, body: any) => void;
    modifier: any;
    openModal: ()=> void;
}

export default function EditModifier({ onClose, action, modifier, openModal }: Props) {
const [verbs, setVerbs] = useState<string[]>([]);

    const [ modifierName, setModifierName ] = useState<string | null>(null);

    useEffect(() => {
        setVerbs(modifier.verbs);
        setModifierName(modifier.modifierName);
    }, []);
    
  return (
    <main className={styles.screen}>
        <div>
            <CloseButton onClose={onClose} />
            <header><h2>Editar modificador</h2></header>
            <main>
                <p>
                    Solo ingrese el nombre del modificador. Las palabras clave, {"(Como, Sin, Mucho, Poco, etc...)"} Seran agregadas desde el punto de venta.
                </p>
                <div>
                    <input type="text" placeholder={ modifierName ?? modifier?.modifierName} onChange={ (e)=> {
                        setModifierName(e.target.value);
                    } } />
                </div>
                <article>
                   <main>
                     {
                     staticModifiers?.map((verb, index) => (
                                      <label htmlFor="">
                                        <OnOffCheckBox
                                          state={verbs.includes(verb.value)}
                                          action={() => {
                                            if (verbs.includes(verb.value)) {
                                              setVerbs(
                                                verbs.filter((item) => item !== verb.value),
                                              );
                                            } else {
                                              setVerbs([...verbs, verb.value]);
                                            }
                                          }}
                                        />
                                        <span>{verb.tittle}</span>
                                      </label>
                         ))
                        }
                   </main>
                </article>
            </main>
            <footer>
                <RequestButton action={()=> {
                    action(modifier._id, {
                        modifierName:  modifierName ?? modifier.modifierName,
                        verbs: verbs

                    })
                    openModal();
                    onClose();
                }} />
            </footer>
        </div>
    </main>
  );
}
