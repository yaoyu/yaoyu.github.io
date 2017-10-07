var VSHADER_SOURCES = 
    'void main() {\n' +
    ' gl_Position = vec4(0.5, 0, 0, 1.0);\n' +
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
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}