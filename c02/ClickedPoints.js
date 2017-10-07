var VSHADER_SOURCES = 
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = 10.0;\n' +
    '}\n';

var FSHADER_SOURCES = 
    'void main() {\n' +
    ' gl_FragColor = vec4(0, 1.0, 0, 1.0);\n' +
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl){
        console.log('得到rendering context for WebGL失败');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCES, FSHADER_SOURCES)){
        console.log('初始化shaders失败!');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0){
        console.log('得到保存的a_Position失败!');
        return;        
    }

    canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position);};
    //gl.vertexAttrib3f(a_Position, 0.5, 0, 0);

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];
function click(ev, gl, canvas, a_Position){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.width * 0.5) /(canvas.width * 0.5);
    y = (canvas.height * 0.5 - (y - rect.top)) / (canvas.height * 0.5);
    g_points.push(x);
    g_points.push(y);
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i += 2){
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}