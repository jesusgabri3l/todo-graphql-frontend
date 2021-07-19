import Swal from 'sweetalert2'

const basicConf = {
    timer: 1000,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    showClass: {
      popup: 'animate__animated animate__zoomIn'
    },
    hideClass: {
      popup: 'animate__animated animate__zoomOut'
    },
    customClass : {
      title: 'text text--white'
    }
}

const successAlert = ({title = 'Action completed successfully', toast = false}) => {
    Swal.fire({
      title: title,
      toast: toast,
      position: toast ? 'top-end' : 'center',
      icon: 'success',
      iconColor: '#10ac84',
      background: '#222f3e',
      ...basicConf
    })
  }

  export {successAlert}