export class MathFunctions
{
    static lerp(a,b,t)
    {
        return a+(b-a)*t;
    }
    static falloff(t)
    {
        return Math.min(1,(t*8)*(t*8));
    }
    static falloff2(t)
    {
        return 1-Math.sqrt((-0.74995*t+1))
    }
}