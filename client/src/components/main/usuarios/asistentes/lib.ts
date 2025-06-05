export const formatContentDailyRegister = (data: any) => {
  if (!data) return [];
  return data.map((element: any) => {
    // Extraer la parte relevante de la fecha
    const rawTime = element?.firstTime;
    const rawTimeTwo = element?.secondTime;
    const rawTimeThree = element?.thirdTime;
    const rawTimeFour = element?.fourthTime;
    const cleanedTime = rawTime?.split(' GMT')[0]; // Quedarnos con "22:02:06"
    const cleanedTimeTwo = rawTimeTwo?.split(' GMT')[0];
    const cleanedTimeThree = rawTimeThree?.split(' GMT')[0];
    const cleanedTimeFour = rawTimeFour?.split(' GMT')[0];

    // Convertir a Date y validar
    const firstTime = cleanedTime
      ? new Date(`1970-01-01T${cleanedTime}Z`)
      : null;

    const secondTime = cleanedTimeTwo
      ? new Date(`1970-01-01T${cleanedTimeTwo}Z`)
      : null;
    const thirdTime = cleanedTimeThree
      ? new Date(`1970-01-01T${cleanedTimeThree}Z`)
      : null;
    const fourthTime = cleanedTimeFour
      ? new Date(`1970-01-01T${cleanedTimeFour}Z`)
      : null;

    // Función para calcular la diferencia en formato hh:mm:ss
    const calculateTimeDifference = (start: Date | null, end: Date | null) => {
      if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
        return '--';
      }
      const diff = end.getTime() - start.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Formatear con ceros iniciales si es necesario
      const formatNumber = (num: number) => num.toString().padStart(2, '0');
      return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
        seconds,
      )}`;
    };

    // Calcular las diferencias de tiempo
    const hoursBreak = calculateTimeDifference(secondTime, thirdTime);
    const hoursShift = calculateTimeDifference(firstTime, fourthTime);

    return {
      user: element.userId?.name ?? '--',
      startOfShift:
        firstTime && !isNaN(firstTime.getTime())
          ? firstTime.toLocaleTimeString('en-US', { hour12: false })
          : '--',
      startOfBreak:
        secondTime && !isNaN(secondTime.getTime())
          ? secondTime.toLocaleTimeString('en-US', { hour12: false })
          : '--',
      endOfBreak:
        thirdTime && !isNaN(thirdTime.getTime())
          ? thirdTime.toLocaleTimeString('en-US', { hour12: false })
          : '--',
      endOfShift:
        fourthTime && !isNaN(fourthTime.getTime())
          ? fourthTime.toLocaleTimeString('en-US', { hour12: false })
          : '--',
      hoursBreak,
      hoursShift,
      _id: element._id,
    };
  });
};
