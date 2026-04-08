import Razorpay from "razorpay";

// console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
  key_id: "rzp_test_Sb2jm8dxMJNPdl",
  key_secret: "dtGJrDkQZVp6FrAx58qj8h4J",
});

export default razorpay;
