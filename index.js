//! intialize connection of webengage SDK
// var webengage;
// ! function (w, e, b, n, g) {
//     function o(e, t) {
//         e[t[t.length - 1]] = function () {
//             r.__queue.push([t.join("."), arguments])
//         }
//     }
//     var i, s, r = w[b],
//         z = " ",
//         l = "init options track screen onReady".split(z),
//         a = "feedback survey notification".split(z),
//         c = "options render clear abort".split(z),
//         p = "Open Close Submit Complete View Click".split(z),
//         u = "identify login logout setAttribute".split(z);
//     if (!r || !r.__v) {
//         for (w[b] = r = {
//             __queue: [],
//             is_spa: 1, //Change this to 0 if you do not wish to use default SPA behaviour of WebEngage SDK
//             __v: "6.0",
//             user: {}
//         }, i = 0; i < l.length; i++) o(r, [l[i]]);
//         for (i = 0; i < a.length; i++) {
//             for (r[a[i]] = {}, s = 0; s < c.length; s++) o(r[a[i]], [a[i], c[s]]);
//             for (s = 0; s < p.length; s++) o(r[a[i]], [a[i], "on" + p[s]])
//         }
//         for (i = 0; i < u.length; i++) o(r.user, ["user", u[i]]);
//         setTimeout(function () {
//             var f = e.createElement("script"),
//                 d = e.getElementById("_webengage_script_tag");
//             f.type = "text/javascript", f.async = !0, f.src = ("https:" == e.location.protocol ? "https://ssl.widgets.webengage.com" : "https://cdn.widgets.webengage.com") + "/js/webengage-min-v-6.0.js", d.parentNode.insertBefore(f, d)
//         })
//     }
// }(window, document, "webengage");
// webengage.init('58b004c1');

const form = document.getElementById('myForm');

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get values from inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Display result
    const result = document.getElementById('result');
    if (name && email) {
        result.textContent = `Thank you, ${name}! We'll contact you at ${email}.`;
        result.style.color = 'green';
        form.reset(); // Clear the form
        console.log('name: ', name);
        console.log('email: ', email);
        webengage.user.login(email); //9SBOkLVMWvPX is the unique user identifier being used here
        webengage.user.setAttribute('name', name);
        webengage.user.setAttribute('email', email);
        webengage.track("form submit", {
            "name": name,
            "email": email
        })
    } else {
        result.textContent = 'Please fill out all fields.';
        result.style.color = 'red';
    }
});