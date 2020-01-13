require('dotenv').config();
const puppeteer = require('puppeteer');


const takeScreenshot = async() => {
    let browser = await puppeteer.launch({headless:false});
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
    await page.goto("https://admin.indeedassessments.com/admin/assessments/vbuvqw-l-nihqxln/builder#/index/questions/121130" , {waitUntil: 'networkidle2'});
    await page.click('.btn-secondary');
    //NEED TO ITERATE THROUGH DIVS WITHIN THE FORM AND ONLY RETURN THE SELECTOR THAT MATCHES WHERE DIV.INNERHTML = "SCORING DIMENSION"

    let data = await page.evaluate(() => {
        let results;
        let collapsibles = document.querySelectorAll('form > .collapsible-form-section > h4');
        collapsibles.forEach(element => {
            results.append(element.innerHTML)
        })
        return {results}
    })
    
    console.log(data)
    
    debugger;

    await browser.close();
};



takeScreenshot();


