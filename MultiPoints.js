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

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer){
        console.log('创建buffer对象失败!');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
}