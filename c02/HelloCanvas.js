function main(){
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl){
        console.log('得到rendering context for WebGL失败');
        return;
    }

    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}