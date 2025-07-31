let menu = document.querySelector('#menu-icon-js');
let menuicon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navtc = document.querySelector('#nav-tc-js');

menu.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.toggle('open');
	navtc.classList.toggle("nav-touch-close-open");
}

navtc.onclick = () => {
	menuicon.classList.toggle('bx-x');
	navbar.classList.remove('open');
	navtc.classList.remove('nav-touch-close-open');
	navtc.classList.remove("nav-tc-z");
	navtc.classList.remove("nav-LR-TC");
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset;

	document.getElementById("header").classList.add('scrolled');
	if (currentScrollPos === 0) {
		// console.log("Hello");
		document.getElementById("header").classList.remove('scrolled');
	}
	if (navtc.classList.contains('nav-touch-close-open')) {
		return;
	}
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("header").style.top = "0";
	} else {
		document.getElementById("header").style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  if (!form) return; // 🛡️ Stop execution if form doesn't exist on the page

  const submitButton = document.querySelector('.contact-button');
  const loader = document.querySelector('.contact-load');
  const submitText = document.querySelector('.submit-text');
  const contactSubmitAfter = document.querySelector('.contact-submit-after');
  const formSection = document.querySelector('.contact-form-wrapper');
  const contactSection = document.querySelector('.contact-sections');
  const csaOK = document.querySelector('.csa-ok');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    submitButton.classList.add('loading');
    loader.style.display = 'inline-block';
    submitText.style.display = 'none';

    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/movlwoal", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        // ✅ Show success message
        contactSubmitAfter?.classList.remove('hide');
        formSection?.classList.add('hide');
        contactSection?.classList.add('csa-cs');
        form?.classList.add('csa-cf');

        form.reset(); // 🔄 Reset form after success
      } else {
        alert("Oops! Something went wrong.");
      }
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      submitButton.classList.remove('loading');
      loader.style.display = 'none';
      submitText.style.display = 'inline-block';
    }
  });

  if (csaOK) {
    csaOK.onclick = () => {
      contactSubmitAfter.classList.add('hide');
      formSection.classList.remove('hide');
      contactSection.classList.remove('csa-cs');
      form.classList.remove('csa-cf');
    };
  }
});