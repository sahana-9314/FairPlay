
const ethers = require('ethers');
const contractABI = require('./contractABI.json');

// Connect to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider('<YOUR_ETHEREUM_RPC_URL>');
const privateKey = '<YOUR_PRIVATE_KEY>';
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contractAddress = '<YOUR_CONTRACT_ADDRESS>';
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Example function to create a new booking
async function createBooking(bookingId, sexWorker, startTime, endTime) {
  const overrides = {
    value: ethers.utils.parseEther('<BOOKING_VALUE_ETH>'), // Set the booking value in Ether
  };

  const tx = await contract.createBooking(bookingId, sexWorker, startTime, endTime, overrides);
  await tx.wait();

  console.log('Booking created successfully!');
}

// Example function to complete a booking
async function completeBooking(bookingId) {
  const tx = await contract.completeBooking(bookingId);
  await tx.wait();

  console.log('Booking completed successfully!');
}

// Example function to get the details of a booking
async function getBooking(bookingId) {
  const booking = await contract.getBooking(bookingId);

  console.log('Booking details:');
  console.log('Customer:', booking.customer);
  console.log('Sex Worker:', booking.sexWorker);
  console.log('Start Time:', new Date(booking.startTime * 1000));
  console.log('End Time:', new Date(booking.endTime * 1000));
  console.log('Completed:', booking.completed);
}

// Run the example functions
async function testContract() {
  try {
    // Create a booking
    await createBooking(1, '<SEX_WORKER_ADDRESS>', <START_TIME>, <END_TIME>);

    // Complete the booking
    await completeBooking(1);

    // Get the booking details
    await getBooking(1);
  } catch (error) {
    console.error('Error:', error);
  }
}

testContract();
