
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


export const CONFIRM = (title, text, type, callback) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: true
  });
  swalWithBootstrapButtons.fire({
    title: title,
    text: text,
    icon: type,
    showCancelButton: true,
    confirmButtonText: "Okey",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      callback()
    }
  });
}