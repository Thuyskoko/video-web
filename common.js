<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script>
const firebaseConfig = {
  apiKey: "AIzaSyDahNKp2jaiJSHzNkKw_VtcCR55y9-IHTQ",
  authDomain: "lovely-7c35f.firebaseapp.com",
  projectId: "lovely-7c35f",
  storageBucket: "lovely-7c35f.firebasestorage.app",
  appId: "1:332526764067:android:86db05d7d827aca1537196"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();
</script>