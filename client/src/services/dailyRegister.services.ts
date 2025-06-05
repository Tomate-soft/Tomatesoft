import axios from '@/configs/axios';

function convertToTimeString(timeString) {
  console.log(timeString);
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const now = new Date();

  // Crear un objeto Date con la fecha actual y el tiempo proporcionado
  const dateWithTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    seconds,
  );

  return dateWithTime.toTimeString();
}

export const updateDailyRegister = async (id: string, body: any) => {
  console.log(body);
  const dataSend = {
    firstTime: convertToTimeString(body.startOfShift),
    secondTime: convertToTimeString(body.startOfBreak),
    thirdTime: convertToTimeString(body.endOfBreak),
    fourthTime: convertToTimeString(body.endOfShift),
  };
  console.log(dataSend);

  const response = await axios.put(`/daily-register/${id}`, dataSend);
  return response;
};
