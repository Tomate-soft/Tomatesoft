import CloseButton from '@/components/customElements/CloseButton';
import styles from './PrinterPreferences.module.css';
import { useState, useEffect } from 'react';
import { useProductsStore } from '@/zstore/products.store';
import { usePrintersStore } from '@/zstore/printers.store';
import RequestButton from '@/components/customElements/saveButton/savebutton';
import { useModal } from '@/hooks/useModals';
import { CONFIRM_CHANGES } from '@/configs/consts';
import ConfirmChangesModal from '@/components/modals/confimChanges/confirmChanges';
import { actions } from './actions';
import { SearchBar } from '@/components/customElements/searchBar/SearchBar';
import { set } from 'ref-napi';

interface Props {
  onClose: any;
  children: any;
  printer: any;
}

export default function PrinterPreferentes({
  onClose,
  children,
  printer
}: Props) {
  // Estado para acciones
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  
  // Estado para productos
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const updatePrinter = usePrintersStore((state) => state.updatePrinter);
  const isLoading = usePrintersStore((state) => state.isLoading);
  const errors = usePrintersStore((state) => state.error);
  const productsArray = useProductsStore((state) => state.productsArray);
  const getProducts = useProductsStore((state) => state.getProducts);
  const [filteredProducts, setFilteredProducts] = useState<string>("");

  useEffect(() => {
    getProducts();
  }, []);

  // Función para manejar el cambio de estado de los checkboxes de acciones
  const handleActionToggle = (actionValue: string) => {
    setSelectedActions(prev => 
      prev.includes(actionValue) 
        ? prev.filter(item => item !== actionValue)
        : [...prev, actionValue]
    );
  };

  const prodsFilter = productsArray.filter((product) => {
    return product.productName.toLowerCase().includes(filteredProducts.toLowerCase()) } )

  // Función para manejar el cambio de estado de los checkboxes de productos
  const handleProductToggle = (productCode: string) => {
    setSelectedProducts(prev => 
      prev.includes(productCode) 
        ? prev.filter(item => item !== productCode)
        : [...prev, productCode]
    );
  };

  // Función para guardar las selecciones
  const handleSave = () => {
    console.log('Acciones seleccionadas:', selectedActions);
    console.log('Productos seleccionados:', selectedProducts);
    // Aquí puedes agregar la lógica para guardar las selecciones
    // hay ue revisar el schema de printer para ver las Props que puedes enviar
    // por ue estos names osn incorrectos
    updatePrinter(printer._id, {
      printActions: selectedActions,
      associatedProducts: selectedProducts,
    });
    confirmChanges.openModal();
  };

  const confirmChanges = useModal(CONFIRM_CHANGES);

  useEffect(() => {
    if (printer) {
      setSelectedActions(printer.printActions);
      setSelectedProducts(printer.associatedProducts);
    }
  }, [printer]);

  return (
    <main className={styles.screen}>
      <div>
        <header>
          <h3>{children}{" - "}{printer.printerName}</h3>
          <CloseButton onClose={onClose}></CloseButton>
        </header>
        <main>
          <div>
            <header>
              Acciones
            </header>
            <section>
            {actions.map((action, index) => (
              <div key={index} >
                <input 
                  type="checkbox"
                  checked={selectedActions.includes(action.value)}
                  onChange={() => handleActionToggle(action.value)}
                />
                <h4 >{action.name}</h4>
              </div>
            ))}
            </section> 
          </div>
          <div>
            <header>
              Productos
              <SearchBar value={filteredProducts} onClear={filteredProducts.length > 0} onSearch={(value: string)=> {
                setFilteredProducts(value);
              }} />
            </header>
            <main>
              {(filteredProducts.length > 0 ? prodsFilter : productsArray ).map((product, index) => (
                <div key={index} >
                  <input 
                    type="checkbox"
                    checked={selectedProducts.includes(product.code)}
                    onChange={() => handleProductToggle(product.code)}
                  />
                  <h4 >{product.productName}</h4>
                </div>
              ))}
              
            </main>
          </div>
        </main>
        <footer>
          <RequestButton action={handleSave}/>   
        </footer>
        {
          confirmChanges.isOpen && <ConfirmChangesModal isOpen={confirmChanges.isOpen} onClose={confirmChanges.closeModal} loading={isLoading} errors={errors} closeModal={onClose}>Cambios guardados</ConfirmChangesModal>
        }
      </div>
    </main>
  );
}