##### 向量名称
```c
vec4(x,y,z,w)
vec4(r,g,b,a)
vec4(s,t,p,q)
```

交换
```c
vec3 yello,magenta,green

yellow.rg = vec2(1.0)
yellow[2] = 0.0

magenta = yellow.rbg

green = yellow.bgb
```

##### 宏设置，浮点数的精度

低精度: lowp
中精度: mediump
高精度: highp


```c
#ifdef GL_ES
precision mediump float;
#endif
```

##### 内置变量

vec4,vec3,vec2
float,int,bool
mat2,mat3,mat4

##### 基本运行
```c
#ifdef GL_ES
precision mediump float;
#endif

void main() {
  gl_FragColor = vec4(0.5);
}
```

##### Vec4

* 构造函数的参数必须是`小数`
* 构造函数需要`1`参数或`4`个参数

```c
vec4(0.5); // vec4(0.5, 0.5, 0.5, 0.5)
vec4(0.5, 0.5, 0.5, 0.5); // 和上面相同的结果
```

* vec4可以通过`vec3+数字` 或 `vec2 + vec2` 组成
```c
vec4(vec3(0.2), 1.0);
```

##### uniform CPU传递给GPU的数据

* 数据不可更改
* 常用数据
float u_time(时间),vec2 u_resolution(画布尺寸),vec2 u_mouse(鼠标位置)
* 在uniform值前加`u_`或者加`iXxx`并大写下一个字母

##### 支持的角度,三角函数和指数函数

sin,cos,tan,asin,acos,atan,pow,exp,log,sqrt,abs,sign,floor,ceil,fract,mod,min,max,clamp

mix(x,y,a)
混合两个数值,[0,1.0]
y占比为a,x占比为剩余的1-a `x * (1 - a) + y * a`

clamp(x,0.0,1.0)
限制数据在(0.0,1.0)中间

sign(数据)
获取数据的正负号
sign(12)=1,sign(0)=0,sign(-2)=-1

mod(除数,被除数)
取模

cos是弧度的y轴,sin是弧度的x轴

sin
sin(x)          // 弧度转[-1.0,1.0] 周期为PI + PI个单位
sin(x + 1)      // 图形向后移动
sin(x + u_time) // 动起来
sin(x * PI)     // 周期缩小为2个单位
sin(x) + 1      // 向上移动
sin(x) * 2      // y轴数据放大
abs(sin(x))     // 弹力球轨迹
ceil(sin(x))    // 只有0和1
floor(sin(x))   // 只有0和1

fract
获取小数部分
x - Math.floor(x)

abs
对称

step(阈值,检测值)
检测值<阈值0.0, 检测值>阈值1.0

smoothstep(开始,结束,插值) 用于颜色过渡,位置平移
插值<开始0.0
插值>结束1.0
插值>开始&&插值<结束,创建平滑值(0,1.0),该值在开始到结束中间距离的比例(0-1.0),(0,1,0.5)=0.5,(0.1,0.2,0.15)=0.5

##### 默认值

* 默认输出颜色 `gl_FragColor`
* 默认输入处理的坐标 `varying gl_FragCoord` 是变化值，不是uniform为唯一值
```c
// 表示正在处理点的坐标除以整个画布的宽高，数据值放在[0.0,1.0]中
vec2 st = gl_FragCoord / u_resplution;

// xy都等于0,在左下角
// x都等于1,红色，在右下角
// y都等于1,绿色，在左上角
gl_FragColor = vec4(st.x,st.y,0.0,1.0);
```
##### 代码解析

```c
vec2 st = gl_FragCoord.xy / u_resolution;
vec3 color = vec3(st.x);  // 左右渐变
vec3 color = vec3(st.y);  // 上下渐变
vec3 color = vec3(st.x, st.y, 1.0);  // 从左下角到右上角渐变
```

```c
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float plot(vec2 st)  {
  return smoothstep(0.02, 0.0, abs(st.y - st.x));
}
void main(){
  // x,y to [0,1.0]
  vec2 st = gl_FragCoord.xy / u_resolution;
  float y = st.x;
  vec3 color = vec3(y); // [0,1.0]
  float pct = plot(st); // [0,0] -> [1.0,1.0]
  color = (1.0 - pct) * color + pct * vec3(0.0, 1.0, 0.0); // 黑白渐变+中间线段的颜色=图形
  gl_FragColor = vec4(color, 1.0);
}
```

参考
https://xiehuating.github.io/2019-04-28/webgl-learning-tutorials-for-beginner/
https://www.yxyy.name/blog/md.html?ossName=16276521220868398063872812052.md&title=webgl%E5%85%A5%E9%97%A8