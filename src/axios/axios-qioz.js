import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-e615d-default-rtdb.firebaseio.com',
});
