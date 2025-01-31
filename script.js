fetch("questions.json").then(res => res.json()).then(questions => {
    info.querySelector("div").replaceWith((window.gen = gen(questions)).next().value);
});

function e(strings, ...values) {
    const template = document.createElement('template');
    template.innerHTML = values.reduce((acc, str, i) => acc + str + strings[i + 1], strings[0]);
    return template.content.firstChild;
}

document.body.appendChild(
    window.info = e`<div data-total=0 data-correct=0>
        <p>0 / 0</p>
        <div></div>
    </div>`
);

function* gen(questions) {
    for(const { question, answers, correct } of questions) {
        info.dataset.check = correct;

        yield e`<div>
            <h2>${question}</h2>
            <div>${answers.map((ans, i) => `<button data-check=${i} onclick="(${(() => {
                if(!this.parentElement.querySelector('.correct')) {
                    info.dataset.total++;
                    if(this.dataset.check == info.dataset.check) info.dataset.correct++;
                    else {
                        this.classList.add('incorrect');
                        this.parentElement.querySelector(`[data-check='${info.dataset.check}']`).classList.add('correct');
                        return;
                    }
                }
                info.querySelector('p').innerHTML = `${info.dataset.correct} / ${info.dataset.total}`;
                info.querySelector('div').replaceWith(gen.next().value);
            }).toString()})()">${ans}</button>`).join("")}</div>
        </div>`;
    }
}