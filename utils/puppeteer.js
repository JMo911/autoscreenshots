require('dotenv').config()
const puppeteer = require('puppeteer');


const takeScreenshot = async(assessment_slug, itemnumber, item_canonical_code, internal_name) => {
    let browser = await puppeteer.launch();
    const options1 = {
        path: `images/PREVIEW${internal_name}_${item_canonical_code}_FRONTEND.png`,
        fullPage: true,
        omitBackground: true
    }
    let page = await browser.newPage();
    //TYPE IN USERNAME
    await page.goto(process.env.BUILDER_LOGIN_URL, {waitUntil: 'networkidle2'});
    await page.focus('#admin_email');
    await page.keyboard.type(process.env.BUILDER_USER);

    //TYPE IN PASS
    await page.focus('#admin_password');
    await page.keyboard.type(process.env.BUILDER_PASS);

    //CLICK LOGIN
    await page.click('.btn-primary')

    //NAVIGATE TO QUESTION
    await page.goto('https://admin.indeedassessments.com/admin/reform/preview/' + itemnumber, {waitUntil: 'networkidle2'});
    // const frontEndScreenshot = 
    await page.screenshot(options1);

//-----------------------------------------------------------------------------------------------------------------------------------

    //BACK-END SCREENSHOTS

    //SET VIEWPORT TO "ZOOM OUT"
    await page.setViewport({
        width: 1000,
        height: 3000,
        deviceScaleFactor: 1
    });

    //NAVIGATE TO BACK END VIEW
    await page.goto("https://admin.indeedassessments.com/admin/assessments/" + assessment_slug + "/builder#/index/questions/" + itemnumber, {waitUntil: 'networkidle2'});
    // console.log(assessment_slug);
    //ONLY IF PUBLISHED IS TRUE
    // await page.click('body > div:nth-child(33) > div > div.modal.fade.show > div > div > div.modal-header > button > span');
    //NEED TO ITERATE THROUGH DIVS WITHIN THE FORM AND ONLY RETURN THE SELECTOR THAT MATCHES WHERE DIV.INNERHTML = "SCORING DIMENSION"
    // const selector = 
    await page.click('#builder > div > div > div.right-col > div > div.body.undefined > form > div:nth-child(14)');

    //works for ele screenshot
    const options2 = {
        path: `images/PREVIEW${internal_name}_${item_canonical_code}_BACKEND.png`,
        fullPage: true
        // omitBackground: true
    }
    // await choicesHandle.screenshot(options2);


    // await elementHandle.screenshot([options2])
    
    // const backEndScreenshot = 
    await page.screenshot(options2);
    await browser.close();
};

module.exports = takeScreenshot;


