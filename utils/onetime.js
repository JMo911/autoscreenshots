require('dotenv').config();
const puppeteer = require('puppeteer');


const takeScreenshot = async() => {
    let browser = await puppeteer.launch();
    const options1 = {
        path: 'recommendations.png',
        fullPage: true,
        omitBackground: true
    }
    let page = await browser.newPage();
    //TYPE IN USERNAME
    await page.goto('https://admin.indeedassessments.com/admins/sign_in', {waitUntil: 'networkidle2'});
    await page.focus('#admin_email');
    await page.keyboard.type(process.env.BUILDER_USER);

    //TYPE IN PASS
    await page.focus('#admin_password');
    await page.keyboard.type(process.env.BUILDER_PASS);

    //CLICK LOGIN
    await page.click('.btn-primary')

    //NAVIGATE TO QUESTION
    await page.goto("https://admin.indeedassessments.com/admin/assessments/o1wngqtb0bo-8nmt/builder#/index/questions/82491" , {waitUntil: 'networkidle2'});
    await page.click('.btn-secondary');
    //NEED TO ITERATE THROUGH DIVS WITHIN THE FORM AND ONLY RETURN THE SELECTOR THAT MATCHES WHERE DIV.INNERHTML = "SCORING DIMENSION"
    // const divsCounts = await page.$$eval('form > div.collapsible-form-section', divs => divs.forEach());
    const myDivs = await page.$$('form > div.collapsible-form-section > h4');
    myDivs.forEach(element => {
        console.log(element.innerHTML)
    });
    // console.log(divsCounts);
    // await page.click('#builder > div > div > div.right-col > div > div.body.undefined > form > div:nth-child(14)');

    // //works for ele screenshot
    // const options2 = {
    //     path: `images/test${item_canonical_code}_BACKEND.png`,
    //     fullPage: true
    //     // omitBackground: true
    // }
    // // await choicesHandle.screenshot(options2);


    // // await elementHandle.screenshot([options2])
    
    // // const backEndScreenshot = 
    // await page.screenshot(options2);
    await browser.close();

    

    // await page.authenticate({username:process.env.BUILDER_USER, password:process.env.BUILDER_PASS});
    // await page.pdf({path: `${URL}.pdf`, format: 'A4'});

    // await browser.close();
};

// const itemnumbers = ['20988', '20994', '21016', '21031', '50629', '21018']

//LOOP THROUGH ITEM NUMBERS TO TAKE SCREENSHOTS

// console.log(getItemNumbers(69139));
// for (let i = 0; i<itemnumbers.length; i++){
//     takeScreenshot(itemnumbers[i])
// }
// getItemNumbers(69139);

takeScreenshot();


