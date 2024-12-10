class Codes {
}
Codes.helloWorld = `
        public final class Main {
            public static void main(String[] args) {
                System.out.println("Hello World!");
            }
        }`;
Codes.q1 = `
    true or false?`;
Codes.q2 = `
    System.out.println(123 == 321);
    true or false?`;
Codes.q3 = `
    boolean isRainy;
    isRainy = false;
    true or false?`;
Codes.q4 = `
    boolean isRainy;
    isRainy = false;
    isRainy = true;
    true or false?`;
Codes.q5_1 = `
    boolean isWindy = true;`;
Codes.q5_2 = `
    boolean isWindy;
    isWindy = true;
    true or false?`;
Codes.q6 = `
    System.out.println(128!=128);
    true or false?`;
Codes.q7 = `
    System.out.println(2+(6+4)/2);`;
Codes.q8 = `
    System.out.println(8+4849*9>=32*94+96*12);`;
Codes.q9 = `
    boolean x = true;
    x = !x;
    System.out.println(!x);`;
Codes.println = `
    System.out.println("Hello World!");`;
Codes.equalTrue = `
    System.out.println(5 == 5);`;
Codes.equalFalse = `
    System.out.println(5 == 3);`;
Codes.declareBool = `
    boolean isSunny;
    isSunny = true;`;
Codes.redeclareBool = `
    boolean isSunny;
    isSunny = true;
    isSunny = false;`;
Codes.do2Things = `
    boolean isSunny = true;`;
Codes.do2ThingsReDecBool = `
    isSunny = true; isSunny = false;`;
Codes.notEqualTrue = `
    System.out.println(5 != 3);`;
Codes.notEqualFalse = `
    System.out.println(5 != 5);`;
Codes.reverseF2T = `
    boolean a = false;
    System.out.println(!a);`;
Codes.reverseT2F = `
    boolean b = true;
    System.out.println(!b);`;
Codes.orGateTF = `
    System.out.println(true || false);`;
Codes.orGateFF = `
    System.out.println(false || false);`;
Codes.orGateTT = `
    System.out.println(true || true);`;
export default Codes;
