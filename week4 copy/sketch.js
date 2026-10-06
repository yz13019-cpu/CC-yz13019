function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(18, 20, 23);

    let cx = width / 2;

    let count = 60;
    let startY = 90;
    let spacing = 7;

    let currentSecond = second();
    let currentMinute = minute();
    let currentHour = hour();

    // =========================
    // 中央淡淡的光
    // =========================

    noStroke();

    for (let r = 180; r > 20; r -= 10) {
        fill(255, 255, 255, 3);
        ellipse(cx, 300, r, r);
    }


    // =========================
    // 60 个沙漏椭圆
    // =========================

    for (let i = 0; i < count; i++) {

        let y = startY + i * spacing;

        let angle = map(
            i,
            0,
            count - 1,
            0,
            PI
        );

        let ellipseWidth =
            280 * abs(sin(angle));

        let ellipseHeight = 14;


        // ==================================
        // SECOND
        // 红色填充
        // ==================================

        if (i <= currentSecond) {

            fill(255, 70, 80, 90);
            stroke(255, 90, 100, 180);

        }


        // ==================================
        // MINUTE
        // 绿色轮廓
        // ==================================

        else if (i >= count - currentMinute) {

            noFill();
            stroke(80, 255, 180, 190);

        }


        // ==================================
        // 普通椭圆
        // ==================================

        else {

            noFill();
            stroke(220, 225, 230, 45);

        }


        strokeWeight(1.5);

        ellipse(
            cx,
            y,
            ellipseWidth,
            ellipseHeight
        );
    }


    // =========================
    // 当前秒的高亮
    // =========================

    let secondY =
        startY + currentSecond * spacing;

    noStroke();

    fill(255, 80, 90, 180);

    ellipse(
        cx,
        secondY,
        8,
        8
    );


    // =========================
    // 当前分钟的高亮
    // 从下往上
    // =========================

    let minuteIndex =
        count - currentMinute - 1;

    let minuteY =
        startY + minuteIndex * spacing;

    noFill();

    stroke(100, 255, 190, 220);
    strokeWeight(2);

    let minuteAngle = map(
        minuteIndex,
        0,
        count - 1,
        0,
        PI
    );

    let minuteWidth =
        280 * abs(sin(minuteAngle));

    ellipse(
        cx,
        minuteY,
        minuteWidth + 8,
        17
    );


    // =========================
    // HOUR
    // 每过一个小时增加一个圆
    // =========================

    for (let i = 0; i < currentHour; i++) {

        let x = 70 + i * 32;

        let y = 520;

        // 外圈
        noFill();
        stroke(255, 180, 70, 100);
        strokeWeight(1.5);

        ellipse(
            x,
            y,
            25,
            25
        );

        // 内部
        noStroke();

        fill(255, 180, 70, 80);

        ellipse(
            x,
            y,
            10,
            10
        );
    }


    // =========================
    // 当前小时的圆
    // =========================

    if (currentHour < 24) {

        let x = 70 + currentHour * 32;

        noFill();
        stroke(255, 200, 90, 220);
        strokeWeight(2);

        ellipse(
            x,
            520,
            30,
            30
        );
    }
}