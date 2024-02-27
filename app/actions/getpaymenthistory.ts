export async function getPaymentHistory() {
  try {
    const res = await prisma?.paymentHistory?.findMany({});
    if (res) {
      return res;
    } else {
      console.log("Something went wrong");
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
