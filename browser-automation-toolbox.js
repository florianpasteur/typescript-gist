// Sources: https://gist.github.com/florianpasteur/118d0e29313c3fb052f944bc001cde88

function findElementByText(text, searchStart = document.body, _document = document, ignoreSpace = false) {
    return _document
        .evaluate(
            `//*[${ignoreSpace ? 'normalize-space' : 'text'}()="${text}"]`,
            searchStart,
            null,
            XPathResult.ANY_TYPE,
            null
        )
        .iterateNext();
}

function findAllElementByText(text, searchStart = document.body, _document = document, ignoreSpace = false) {
    let results = [];
    let query = _document
        .evaluate(
            `//*[${ignoreSpace ? 'normalize-space' : 'text'}()="${text}"]`,
            searchStart,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}


/**
 * Find an element in the context
 * @param {string} selector css selector of element
 * @param {Document} _document start point of search
 * @return {HTMLElement} element found
 * @example findBySelector('h2', findIframeDocument(findBySelector('iframe')))
 */
function findBySelector(selector, _document = document) {
    return _document.querySelector(selector)
}

/**
 * Find all elements in the context
 * @param {string} selector css selector of elements
 * @param {Document} _document start point of search
 * @return {Array<HTMLElement>} elements found
 * @example findAllBySelector('label', findIframeDocument(findBySelector('iframe')))
 */
function findAllBySelector(selector, _document = document) {
    return Array.from(_document.querySelectorAll(selector))
}

function getBetterSelector(element) {
    return [
        ...Array.from(element.classList)
            .map((classElement) => ('.' + classElement)),
        element.classList.value.split(' ').map(c => '.' + c).join(''),
        element.tagName,
        '#' + element.id,
    ].filter((selector) => selector !== '#')
        .map((selector) => ({selector, count: findAllBySelector(selector).length}))
        .concat([
            {selector: element.textContent, count: findAllElementByText(element.textContent).length},
        ]).sort((a, b) => {
            return a.count - b.count;
        })
}

/**
 * Safely save data in locate storage but merge it with current value for later use (after page refresh for example)
 * @param {*} data object to save
 * @param {string} [name=browserAutomation] name of the object to save
 */
function safeSave(data, name = 'browserAutomation') {
    localStorage.setItem(name, JSON.stringify({
        ...load(name),
        ...data
    }));
}

/**
 * Save data in locate storage for later use (after page refresh for example)
 * @param {*} data object to save
 * @param {string} [name=browserAutomation] name of the object to save
 */
function save(data, name = 'browserAutomation') {
    localStorage.setItem(name, JSON.stringify(data));
}


/**
 * Load data from locate storage
 * @param {string} [name=browserAutomation] name of the object to load
 */
function load(name = 'browserAutomation') {
    return JSON.parse(localStorage.getItem(name));
}

/**
 * Retrieve the document of an iframe
 * @param {HTMLIFrameElement} iframeElement
 * @return {Document} document of iframe
 *
 * @example var iframeDocument = findIframeDocument(findBySelector('iframe'));
 */
function findIframeDocument(iframeElement) {
    return iframeElement.contentDocument;
}

/**
 * Replace the content of the page with an iframe of the current page
 *
 * @return {HTMLIFrameElement} generated iframe
 */
function inception() {
    const iframe = document.createElement('iframe');
    iframe.src = location.href;
    iframe.width = '100%';
    iframe.height = '100%';
    document.body.innerHTML = '';
    document.body.appendChild(iframe);
    return iframe;
}

function setKeywordText(text, selector) {
    var el = document.querySelector(selector);
    el.value = text;
    var evt = document.createEvent("Events");
    evt.initEvent("change", true, true);
    el.dispatchEvent(evt);
}

function Stepper(_speed) {
    const speed = _speed || 700;
    let _stepIndex = 0;
    let stop = false;
    const stepsPid = [];

    return function step(behavior, cost = 1) {
        _stepIndex += cost;
        stepsPid.push(setTimeout(() => {
            if (!stop) {
                try {
                    behavior()
                } catch (e) {
                    stop = true;
                    console.error(behavior, e);
                    stepsPid.forEach(id => clearTimeout(id))
                }
            }
        }, speed * _stepIndex))
    }
}


var step = new Stepper();





/*
// Example
[
    ['A', 'B']
//....
].forEach(([a, b]) => {
    step(() => console.log(a, b), 0);
    step(() => document.querySelector('*[aria-label="Actions"]').click(), 2);
    step(() => findElementByText('New linked work item').click());
    step(() => document.querySelector('#dialog-label').value = "Make " + b);
    step(() => document.querySelector('#ok').click());
    step(() => findElementByText('Save & Close').click(), 2);
});

*/


/*
Example 2
function* manualStepper() {

    const correct = [1,2,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => n.toString(10));
    const iframe = inception();
    const iframeDocument = () => findIframeDocument(iframe);
    yield;

    do {
        const questionIndex = findBySelector('.picurrent', iframeDocument()).textContent;

        const data = load();

        if (correct.includes(questionIndex)) {
            const correctAnswer = data[questionIndex].answered[0];

            (
                findElementByText(correctAnswer, iframeDocument().body, iframeDocument(), true) ||
                findElementByText(correctAnswer, iframeDocument().body, iframeDocument(), false)
            ).click();

            console.log('Select existing anwser: ' + correctAnswer);
        } else {
            const alreadyAnswered = data[questionIndex].answered;
            const responses = data[questionIndex].responses;

            const newAnswer = responses.find(r => !alreadyAnswered.includes(r));

            (
                findElementByText(newAnswer, iframeDocument().body, iframeDocument(), true) ||
                findElementByText(newAnswer, iframeDocument().body, iframeDocument(), false)
            ).click();

            safeSave({
                [questionIndex]: {
                    ...data[questionIndex],
                    answered: [newAnswer, ...alreadyAnswered]
                }
            });

            console.log('Select new anwser: ' + newAnswer, alreadyAnswered);

        }


        yield;

        findElementByText('RÉPONDRE', iframeDocument().body, iframeDocument(), false).click();
        console.log('click on anwser ');


        console.log('Continue ?');
    } while (yield)

}

var mStep = manualStepper();

mStep.next();
 */