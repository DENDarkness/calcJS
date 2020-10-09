        const calc = {
            number: '',
            input: null,
            operator: '',
            containerKeyboard: null,
            containerMath: null,

            init() {
                this.number = '';
                this.containerKeyboard = document.querySelector('#keyboard');
                this.input = document.querySelector('#inp');
                this.containerMath = document.querySelector('#math');
                this._renderKeyboard();
                this._handleEvents();
            },
            _handleEvents() {
                this.containerKeyboard.addEventListener('click', evt => {
                    if (evt.target.name == "clean") {
                        this._cleanNum();
                    };
                    if (evt.target.name == "eq") {
                        this._handleString(this.number, this.operator)
                    };
                    if (evt.target.name == 'num' || evt.target.parentNode.name == 'num') {
                        let dataSet = evt.target.name == 'num' ? evt.target.dataset : evt.target.parentNode.dataset;
                        this._addNum(dataSet.value);
                    }
                })
                this.containerMath.addEventListener('click', evt => {
                    if (evt.target.name == 'math') {
                        let dataSet = evt.target.dataset;
                        this._addNum(dataSet.value);
                        this.operator = dataSet.value;
                        console.log(this.operator);
                    };
                })
            },
            _renderKeyboard() {
                const MATH = ['+', '-', '*', '÷'];
                let str = '';
                let math = '';
                for (let i = 0; i <= 9; i++) {
                    str += `<button name="num" data-value="${i}" data-some="${i} - number">
                                <span>${i}</span>
                            </button>`
                }
                for (let i = 0; i <= 3; i++) {
                    math += `<button name="math" data-value="${MATH[i]}">${MATH[i]}</button>`;
                }
                str += `<button name="eq" data-value="eq">=</button>`;
                str += `<button name="clean" data-value="clean">C</button>`;
                this.containerKeyboard.innerHTML = str;
                this.containerMath.innerHTML = math;
            },
            _addNum(num) {
                this.number += num;
                this.input.value = this.number;
                console.log(this.number)
            },
            _cleanNum() {
                this.number = '';
                this.input.value = this.number;
            },
            _handleString(str, operator) {
                let arr = str.split(operator);
                this._getMath(arr, operator);
            },
            _getMath(arr, operator) {
                switch (operator) {
                    case '÷':
                        this.number = +arr[0] / +arr[1];
                        this.input.value = this.number;
                        break;
                    case '*':
                        this.number = +arr[0] * +arr[1];
                        this.input.value = this.number;
                        break;
                    case '-':
                        this.number = +arr[0] - +arr[1];
                        this.input.value = this.number;
                        break;
                    case '+':
                        this.number = +arr[0] + +arr[1];
                        this.input.value = this.number;
                        break;
                }

            }
        }

        calc.init();
