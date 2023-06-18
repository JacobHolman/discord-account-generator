const puppeteer = require('puppeteer');
let amount = 0;
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a number of accounts to create: ', (input) => {
  const number = parseInt(input);
  console.log("Creating", number, "accounts..");
  amount = number;

  createAccounts(amount)
    .then(() => {
      console.log("Account creation completed.");
      rl.close();
    })
    .catch((error) => {
      console.error("Account creation failed: ", error);
      rl.close();
    });
});

async function createAccounts(amount) {
  const browser = await puppeteer.launch();
  for (let i = 0; i < amount; i++) {
    const page = await browser.newPage();
    await page.goto('https://discord.com/register');

    const email = makeid(23) + "@gmail.com";
    const username = makeid(10);
    const password = makeid(30);
    await page.type('input[name="email"]', email);
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.type('[tabindex="1"]', "May");
    await page.type('[tabindex="2"]', "1");
    await page.type('[tabindex="3"]', "2000");
    await page.click('button[type="submit"]');
    console.log("Email: " + email + " Username: " + username + " Password: " + password)
  }
  await browser.close();
}
