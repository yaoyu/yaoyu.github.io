function main(){
    var canvas = document.getElementById('example');
    if(!canvas){
        console.log('得到<canvas>元素失败');
        return;
    }

    var ctx = canvas.getContext('2d');

    //绘制蓝色矩形
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
}