export class Noise
{
    static randomNoise(x,y)
    {

        let xr = x*x+y*0b10011110001101110111100110110001;
        let yr = y*y+x*0b10000101111010111100101001110111;
        xr = xr>>7;
        yr = yr>>7;
        let result = (xr*yr);
        result *= 0b11000010101100101010111000111101
        result ^= (xr*yr)>>3;
        result *= 0b00100111110101001110101100101111
        result ^= (xr*yr)>>5;
        result = Math.abs(result)%512/512
        return result
    }
    static pseudoRandomNoise(x,y)
    {
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        let xd = x-xf;
        let yd = y-yf;
        let p0 = this.randomNoise(xf,yf);
        let p1 = this.randomNoise(xf+1,yf);
        let p2 = this.randomNoise(xf,yf+1)
        let p3 = this.randomNoise(xf+1,yf+1);
        let v01 =this.lerp(p0,p1,xd);
        let v23 =this.lerp(p2,p3,xd);
        let v = this.lerp(v01,v23,yd);
        return v;
    }
    static lerp(a,b,t)
    {
        return a*(1-t)+b*t;
    }
}
