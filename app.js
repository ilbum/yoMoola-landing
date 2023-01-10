function submitToAPI(e) {
  e.preventDefault();

  var fullName = document.getElementById('input-contact-full-name').value;
  var email = document.getElementById('input-contact-email').value;
  var message = document.getElementById('input-contact-message').value;

  if (fullName == '' || email == '' || message == '') {
    alert('Please Fill All Required Field');
    return false;
  }

  var nameRE = /^\w+/;
  if (!nameRE.test(fullName)) {
    alert('Full Name is not valid');
    return false;
  }

  var emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRE.test(email)) {
    alert('Email Address is not valid');
    return false;
  }

  var data = {
    fullName: fullName,
    email: email,
    message: message,
  };

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    'POST',
    'https://g76bk8sy89.execute-api.us-west-1.amazonaws.com/Production/send-email '
  );
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  xmlhttp.send(JSON.stringify(data));
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        console.log('successful');
        document.getElementById('row-contact-form').innerHTML =
          '<h3 class="text-center mb-4 pb-4">Thank you for your message/feedback<br>our team will get back to you soon!</h3>';
      } else {
        console.log('failed');
      }
    }
  };
}
