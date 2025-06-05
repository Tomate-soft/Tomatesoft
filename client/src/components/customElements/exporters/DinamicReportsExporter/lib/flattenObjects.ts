export const flattenObject = <T extends Record<string, unknown>>(
    obj: T,
    parentKey: string = "",
    result: Record<string, unknown> = {}
  ): Record<string, unknown> => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        const value = obj[key];
        
        if (Array.isArray(value)) {
          // Expandir arrays en columnas separadas numeradas
          value.forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              flattenObject(item as Record<string, unknown>, `${newKey}.${index}`, result);
            } else {
              result[`${newKey}.${index}`] = item;
            }
          });
        } else if (typeof value === "object" && value !== null) {
          // Expandir objetos anidados
          if (Object.keys(value as object).length > 0) {
            flattenObject(value as Record<string, unknown>, newKey, result);
          } else {
            result[newKey] = ""; // Objeto vacío
          }
        } else if (value !== "--") {
          result[newKey] = value; // Evita agregar valores "--"
        }
      }
    }
    return result;
  };

  // Función para aplanar una lista de JSON
export const flattenArray = <T extends Record<string, unknown>>(
  data: T[]
): Record<string, unknown>[] => data.map((item) => flattenObject(item));
