// Opción 4: Formato texto (día de mes de año)
export const formatDate = (dateStr: string ) => {
    const [day, month, year] = dateStr.split('/');
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${day} de ${months[parseInt(month) - 1]} de ${year}`;
  };
  