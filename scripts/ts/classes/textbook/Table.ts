import assert from "../assert/assert.js";
import Setting from "../setting/Setting.js";

export default class Table {
    static compareTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Java定義</th>
                <th scope="col">數學定義 <br>a和b∈實數</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <th scope="row">a > b</th>
                    <td>a > b</td>
                </tr>
                <tr>
                    <th scope="row">a < b</th>
                    <td>a < b</td>
                </tr>
                <tr>
                    <th scope="row">a >= b</th>
                    <td>a >= b</td>
                </tr>
                <tr>
                    <th scope="row">a <= b</th>
                    <td>a <= b</td>
                </tr>
            </tbody>`
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }

    static equalTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Java定義 </th>
                <th scope="col">數學定義 <br>a和b為任何數</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <th scope="row">a != b</th>
                    <td>a ≠ b</td>
                </tr>
                <tr>
                    <th scope="row">a == b</th>
                    <td>a = b</td>
                </tr>
            </tbody>`
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }

    static booleanOperatorTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Java定義</th>
                <th scope="col">作用</th>
                <th scope="col">返回值</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <th scope="row">!a</th>
                    <td>取反</td>
                    <td>若 a 為 false，輸出 true <br>
                    若 a 為 true，輸出 false
                    </td>
                </tr>
                <tr>
                    <th scope="row">a || b</th>
                    <td>或</td>
                    <td>若 a或 b為 true，輸出 true <br>
                    若 a與 b為 false，輸出 false
                    </td>
                </tr>
                <tr>
                    <th scope="row">a && b</th>
                    <td>且</td>
                    <td>若 a或 b為 false，輸出 false <br>
                    若 a與 b為 true，輸出 true
                    </td>
                </tr>
            </tbody>`
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }

    static binaryOperatorTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Java定義</th>
                <th scope="col">作用</th>
                <th scope="col">返回值</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <th scope="row">a | b</th>
                    <td>在a或b其中一個變量的某位二進位位元為1時，
                    <br>結果c該位的值為1，其餘位元為0。</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">a & b</th>
                    <td>在a與b兩個變量的某位二進位位元同時為1時，
                    <br>結果c該位的值為1其餘位元為0。</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">a ^ b</th>
                    <td>在a與b兩個變量的某位二進位位元不相同時，
                    <br>結果c該位的值為1，其餘位元為0。</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">~a</th>
                    <td>若a的某位二進位位元為0則結果c該位為1；
                    <br>若a的某位二進位位元為1則結果c該位為0。</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">a >> b</th>
                    <td>在保留正負號的情況下，
                    <br>將a逐位元右移b個單位，結果為c</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">a << b</th>
                    <td>在保留正負號的情況下，
                    <br>將a逐位元左移b個單位，結果為c。</td>
                    <td>結果c的十進位。</td>
                </tr>
                <tr>
                    <th scope="row">a >>> b</th>
                    <td>在忽略正負號的情況下，將a逐位元左移b個單位，
                    <br>左邊空位元直接補0，結果為c</td>
                    <td>結果c的十進位。</td>
                </tr>
            </tbody>`
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }

    static syntacticSugarOperatorTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col">Java定義</th>
                <th scope="col">作用</th>
                <th scope="col">返回值</th>
                <th scope="col">等價寫法</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <th scope="row">a++</th>
                    <td>返回a，並將a設置為a+1</td>
                    <td>原始a</td>
                    <td>a = a + 1</td>
                </tr>
                <tr>
                    <th scope="row">++a</th>
                    <td>將a設置為a+1，並返回a</td>
                    <td>a</td>
                    <td>a = a + 1</td>
                </tr>
                <tr>
                    <th scope="row">a--</th>
                    <td>返回a，並將a設置為a-1</td>
                    <td>原始a</td>
                    <td>a = a - 1</td>
                </tr>
                <tr>
                    <th scope="row">--a</th>
                    <td>將a設置為a-1，並返回a</td>
                    <td>a</td>
                    <td>a = a - 1</td>
                </tr>
                <tr>
                    <th scope="row">a += b</th>
                    <td>將a設置為a+b，並返回a</td>
                    <td>a</td>
                    <td>a = a + b</td>
                </tr>
                <tr>
                    <th scope="row">a -= b</th>
                    <td>將a設置為a-b，並返回a</td>
                    <td>a</td>
                    <td>a = a - b</td>
                </tr>
                <tr>
                    <th scope="row">a *= b</th>
                    <td>將a設置為a*b，並返回a</td>
                    <td>a</td>
                    <td>a = a * b</td>
                </tr>
                <tr>
                    <th scope="row">a /= b</th>
                    <td>將a設置為a/b，並返回a</td>
                    <td>a</td>
                    <td>a = a / b</td>
                </tr>
                <tr>
                    <th scope="row">a |= b</th>
                    <td>將a設置為a | b，並返回a</td>
                    <td>a</td>
                    <td>a = a | b</td>
                </tr>
                <tr>
                    <th scope="row">a &= b</th>
                    <td>將a設置為a&b，並返回a</td>
                    <td>a</td>
                    <td>a = a & b</td>
                </tr>
                <tr>
                    <th scope="row">a ^= b</th>
                    <td>將a設置為a^b，並返回a</td>
                    <td>a</td>
                    <td>a = a ^ b</td>
                </tr>
                <tr>
                    <th scope="row">a %= b</th>
                    <td>將a設置為a%b，並返回a</td>
                    <td>a</td>
                    <td>a = a % b</td>
                </tr>
            </tbody>`
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }

    static typesTable() {
        const table = document.createElement("table");
        table.innerHTML = `
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">範圍</th>
                <th scope="col">小數支援</th>
                <th scope="col">位元</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">Double<br>(double)</th>
                <td>-(2-2⁻⁵²)×2¹⁰²³<br>~ (2-2⁻⁵²)×2¹⁰²³</td>
                <td>是</td>
                <td>64</td>
                </tr>
                <tr>
                <th scope="row">Long<br>(long)</th>
                <td>-9,223,372,036,854,775,808<br>~ 9,223,372,036,854,775,807</td>
                <td>否</td>
                <td>64</td>
                </tr>
                <tr>
                <th scope="row">Float<br>(float)</th>
                <td>-(2-2⁻²³)×2¹²⁷<br>~ (2-2⁻²³)×2¹²⁷</td>
                <td>是</td>
                <td>32</td>
                </tr>
                <tr>
                <th scope="row">Integer<br>(integer)</th>
                <td>-2,147,483,648<br>~ 2,147,483,647</td>
                <td>否</td>
                <td>32</td>
                </tr>
                <tr>
                <th scope="row">Short<br>(short)</th>
                <td>-32,768 ~ 32,767</td>
                <td>否</td>
                <td>16</td>
                </tr>
                <tr>
                <th scope="row">Char<br>(char)</th>
                <td>0 ~ 65,536<br>(\'\\u0000\' ~ \'\\uffff\')</td>
                <td>否</td>
                <td>16</td>
                </tr>
                <tr>
                <th scope="row">Byte<br>(byte)</th>
                <td>-128 ~ 127</td>
                <td>否</td>
                <td>8</td>
                </tr>
                <tr>
                <th scope="row">Boolean<br>(byte)</th>
                <td>0 ~ 1(false ~ true)</td>
                <td>否</td>
                <td>1</td>
                </tr>
            </tbody>
        `;
        var lessonMedia = document.getElementById(Setting.lessonMediaID);
        assert(lessonMedia !== null);
        lessonMedia.appendChild(table);
    }
}
