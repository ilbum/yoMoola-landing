function submitToAPI(e) {
  e.preventDefault();

  var fullName = document.getElementById('input-contact-full-name').value;
  var email = document.getElementById('input-contact-email').value;
  var message = document.getElementById('input-contact-message').value;

  if (fullName == '' || email == '' || message == '') {
    alert('Please Fill All Required Field');
    return false;
  }

  var nameRE = /^[A-Z]{1}[a-z]{2,20}[ ]{1}[A-Z]{1}[a-z]{2,20}/;
  if (!nameRE.test(fullName)) {
    alert('Name entered, is not valid');
    return false;
  }

  var emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRE.test(email)) {
    alert('Email Address entered, is not valid');
    return false;
  }
  var data = {
    fullName: fullName,
    email: email,
    message: message,
  };

  console.log(JSON.stringify(data));

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open(
    'POST',
    'https://g76bk8sy89.execute-api.us-west-1.amazonaws.com/Test/send-email '
  );
  xmlhttp.setRequestHeader('Content-Type', 'application/json');
  xmlhttp.send(data);
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      var response = JSON.parse(xmlhttp.responseText);
      if (xmlhttp.status === 200) {
        console.log('successful');
        document.getElementById('contact-form').innerHTML =
          '<h1>Thank you for your message/feedback<br>our team will get back to you soon!</h1>';
      } else {
        console.log('failed');
      }
    }
  };

  document.getElementById('contact-form').reset();
  // TODO deactivate send button
  // TODO CORS on API Gateway
}
