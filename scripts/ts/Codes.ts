export default class Codes {
    public static readonly helloWorld: string = `
        public final class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
        }`;
    public static readonly q1: string = `
    true or false?`;
    public static readonly q2: string = `
    System.out.println(123 == 321);
    true or false?`;
    public static readonly q3: string = `
    boolean isRainy;
    isRainy = false;
    true or false?`;
    public static readonly q4: string = `
    boolean isRainy;
    isRainy = false;
    isRainy = true;
    true or false?`;
    public static readonly q5_1: string = `
    boolean isWindy = true;`;
    public static readonly q5_2: string = `
    boolean isWindy;
    isWindy = true;
    true or false?`;
    public static readonly q6: string = `
    System.out.println(128!=128);
    true or false?`;
    public static readonly q7: string = `
    System.out.println(2+(6+4)/2);`;
    public static readonly q8: string = `
    System.out.println(8+4849*9>=32*94+96*12);`;
    public static readonly q9: string = `
    boolean x = true;
    x = !x;
    System.out.println(!x);`;

    public static readonly println: string = `
    System.out.println("Hello World!");`;
    public static readonly equalTrue: string = `
    System.out.println(5 == 5);`;
    public static readonly equalFalse: string = `
    System.out.println(5 == 3);`;
    public static readonly declareBool: string = `
    boolean isSunny;
    isSunny = true;`;
    public static readonly redeclareBool: string = `
    boolean isSunny;
    isSunny = true;
    isSunny = false;`;
    public static readonly do2Things: string = `
    boolean isSunny = true;`;
    public static readonly do2ThingsReDecBool: string = `
    isSunny = true; isSunny = false;`;
    public static readonly notEqualTrue: string = `
    System.out.println(5 != 3);`;
    public static readonly notEqualFalse: string = `
    System.out.println(5 != 5);`;
    public static readonly reverseF2T: string = `
    boolean a = false;
    System.out.println(!a);`;
    public static readonly reverseT2F: string = `
    boolean b = true;
    System.out.println(!b);`;
    public static readonly orGateTF: string = `
    System.out.println(true || false);`;
    public static readonly orGateFF: string = `
    System.out.println(false || false);`;
    public static readonly orGateTT: string = `
    System.out.println(true || true);`;
}