document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('snow');
    var ctx = canvas.getContext('2d');

    // 设置 canvas 的大小为全屏
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 雪花的数量
    var numberOfSnowflakes = 100;
    var snowflakes = [];

    for (var i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            density: Math.random() * numberOfSnowflakes
        });
    }

    // 绘制雪花
    function drawSnowflakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.beginPath();

        for (var i = 0; i < numberOfSnowflakes; i++) {
            var snowflake = snowflakes[i];
            ctx.moveTo(snowflake.x, snowflake.y);
            ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, true);
        }

        ctx.fill();
        moveSnowflakes();
    }

    // 移动雪花
    function moveSnowflakes() {
        for (var i = 0; i < numberOfSnowflakes; i++) {
            var snowflake = snowflakes[i];
            snowflake.y += Math.pow(snowflake.density, 0.5) + 1;
            snowflake.x += Math.sin(snowflake.y);

            // 当雪花到达屏幕底部时，重新设置它们的位置
            if (snowflake.y > canvas.height) {
                snowflakes[i] = {
                    x: Math.random() * canvas.width,
                    y: 0,
                    radius: snowflake.radius,
                    density: snowflake.density
                };
            }
        }
    }

    // 使用 requestAnimationFrame 来持续绘制雪花
    function animate() {
        requestAnimationFrame(animate);
        drawSnowflakes();
    }

    animate();
});
</script>
