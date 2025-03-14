
import Swal from 'sweetalert2';


export const ALERT = (title, text, type, callback) => {
  Swal.fire({
    title: title,
    text: text,
    icon: type,
    confirmButtonText: 'OK',  
  }).then((result) => {
    if (result.isConfirmed) {
      callback(); 
    }
  });
}
