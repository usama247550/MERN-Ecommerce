import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51SKG7f9xUD72ug4gRmG0ZCoPa7FqSUKomK8icEpKSqv2bOMNH5peaocBpsAKTWh6iKHVu7i5DhHb2gWcC8umOz1n00Zjr9nMtz"
);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (req, res) => {
  try {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: { name: "Purchase" },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default createPayment;
