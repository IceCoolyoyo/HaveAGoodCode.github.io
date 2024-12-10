export class Part {
}
Part.Part1 = Object.freeze(`@Ball:true為真，false為假
        @Ball:在電腦的任何地方的真假表示都用true或者false
        @Ball:例如：「今天是星期一嗎？」
        @Ball:如果今天是星期一，電腦就會回答 true；
        @Ball:如果不是，電腦就會回答 false。
        @Ball:「水有毒嗎?」
        @Code:q1
        @Answer:false`);
Part.Part2 = Object.freeze(`@Ball:==用來判斷是否相等
        @Ball:如果跟電腦說5 == 5 
        @Ball:那電腦就會回答 true (真的)
        @Ball:因為 5 跟 5 是一樣的。
        @Ball:但如果跟電腦說5 == 3
        @Ball:那電腦就會回答 false (假的)
        @Ball:因為 5 跟 3 不一樣。`);
Part.Part3 = Object.freeze(`@Code:println
        @Ball:用來輸出結果
        @Ball:就是讓電腦把東西「寫出來」。`);
Part.Part4 = Object.freeze(`@Code:equalTrue
        @Ball:這樣電腦會輸出 true
        @Ball:因為 5 跟 5 是一樣的。
        @Code:equalFalse
        @Ball:那電腦會輸出 false
        @Ball:因為 5 跟 3 不一樣。
        @Ball:「123和321是否相同?」
        @Code:q2
        @Answer:false`);
Part.Part5 = Object.freeze(`@Ball:電腦需要儲存資料時
        @Ball:電腦需要知道資料的長相才能儲存
        @Ball:所以true和false其實是一種特定的「資料長相」
        @Ball:叫做 boolean。
        @Ball:意思是電腦會用這個 「boolean」 
        @Ball:來儲存只有「真」或「假」的資訊
        @Ball:就像電腦在說：「喔，這個東西是 boolean
        @Ball:所以它只能是 true 或 false。」`);
Part.Part6 = Object.freeze(`@Ball:我們還可以用「名字 = 東西;」
        @Ball:來把資料放進剛剛建立的空間裡。
        @Code:declareBool
        @Ball:這樣就是在 isSunny裡存了一個 true
        @Ball:表示今天是晴天。
        @Ball:「isRainy裡面存的是什麼?」
        @Code:q3
        @Answer:false`);
Part.Part7 = Object.freeze(`@Ball:而且名字還可以一直用
        @Code:redeclareBool
        @Ball:把裡面的資料換成 false
        @Ball:可能原本天氣是晴朗的
        @Ball:但後來天氣變陰了
        @Ball:就可以告訴電腦後來天氣的變化。
        @Ball:「isRainy裡面存的是什麼?」
        @Code:q4
        @Answer:true`);
Part.Part8 = Object.freeze(`@Ball:我們還可以一次完成兩件事：
        @Ball:建立空間，然後把資料存進去。
        @Ball:用「長相 名字 = 資料;」的方式
        @Ball:電腦就會自動完成這兩件事。
        @Code:do2Things
        @Ball:這樣就直接建立了一個 isSunny 的空間
        @Ball:並且存了 true表示天氣是晴天。
        @Ball:同樣的，如果之後天氣變了
        @Code:do2ThingsReDecBool
        @Ball:可以跟電腦說天氣變陰了。
        @Ball:「下列兩段程式碼是否相等?」
        @Code:q5_1
        @Code:q5_2
        @Answer:true`);
Part.Part9 = Object.freeze(`@Ball:!= 就是用來判斷「兩個東西是不是不同」的。
        @Code:notEqualTrue
        @Ball:這樣就會輸出 true
        @Ball:因為 5 和 3 不一樣。
        @Code:notEqualFalse
        @Ball:那它會輸出 false
        @Ball:因為 5 跟 5 是一樣的。
        @Ball:「請回答下列程式碼的輸出?」
        @Code:q6
        @Answer:false`);
Part.Part10 = Object.freeze(`@Ball:電腦的加減乘除，基本上跟數學一樣
        @Ball:只是乘法和除法的符號稍微不同：
        @Ball:加法：1 + 1，電腦回答 2、
        @Ball:減法：2 - 1，電腦回答 1、
        @Ball:乘法：2 * 1，就是數學的2 × 1，電腦回答 2、
        @Ball:除法：4 / 2，就是數學的4 ÷ 2，電腦回答 2。
        @Ball:括號也和數學裡一樣。
        @Ball:所以如果想改變計算的順序
        @Ball:就可以用括號把它包起來。
        @Ball:比如說：(3 + 5) * 2這樣電腦會先算括號裡的 3 + 5 = 8
        @Ball:然後再乘 2，結果就是 16。
        @Ball:但如果沒括號，像這樣： 3 + 5 * 2
        @Ball:電腦會先算乘法 5 * 2 = 10 
        @Ball:然後再加 3，結果是 13。
        @Ball:「請回答下列程式碼的輸出?」
        @Code:q7
        @Answer:7`);
Part.Part11 = Object.freeze(`@Ball:電腦連大於、小於、大於或等於、小於或等於
        @Ball:這些數學符號也能用，而且和數學完全一樣。
        @Ball:比如： 大於：5 > 3
        @Ball:電腦會回答 true因為 5 比 3 大、
        @Ball:小於：3 < 5
        @Ball:電腦會回答 true，因為 3 比 5 小、
        @Ball:大於或等於：5 >= 5
        @Ball:電腦會回答 true，因為 5 等於 5、
        @Ball:小於或等於：3 <= 5
        @Ball:電腦會回答 true，因為 3 比 5 小。
        @Ball:如果程式寫System.out.println(7 >= 8);
        @Ball:這樣就會輸出 false
        @Ball:因為 7 既不比 8 大，也不等於 8。
        @Ball:「請回答下列程式碼的輸出?」
        @Code:q8
        @Answer:true`);
Part.Part12 = Object.freeze(`@Ball:! 是用來反轉 boolean 值的
        @Ball:這就像告訴電腦：「如果它是真的，給我假的；
        @Ball:如果它是假的，給我真的。」
        @Code:reverseF2T
        @Ball:這樣就是先存 false 到 a
        @Ball:然後用 !a 把它反轉，結果就會輸出 true。
        @Code:reverseT2F
        @Ball:這次 b 是 true，反轉後就會輸出 false。
        @Ball:「請回答下列程式碼的輸出?」
        @Code:q9
        @Answer:true`);
Part.Part13 = Object.freeze(`@Ball:|| 是「或」的意思
        @Ball:只要兩個條件中有一個是真的（true），結果就會是 true；
        @Ball:只有兩個都假的時候，才會是 false。
        @Code:orGateTF
        @Ball:這樣因為 true 和 false 中有一個是真的，所以輸出是 true。
        @Code:orGateFF
        @Ball:這次兩個條件都是假的，所以結果是 false。
        @Ball:那如果兩個條件都是真的呢？
        @Code:orGateTT
        @Ball:它會輸出 true，因為有一個真
        @Ball:甚至兩個都真，都符合條件。`);
Part.Part14 = Object.freeze(`@Ball:&& 是「與」的意思，它的規則是：
        @Ball:只有兩個條件都是真的（true），結果才會是 true；
        @Ball:只要有一個是假的，結果就會是 false。
        @Ball:比如：System.out.println(true && true); 
        @Ball:這樣因為 true 和 true 都是真的，所以結果是 true。
        @Ball:但如果是：System.out.println(true && false); 
        @Ball:這次因為其中一個是假的，所以結果是 false。
        @Ball:再看這個：System.out.println(false && false); 
        @Ball:兩個都是假的，結果還是 false。
        @Ball:所以 && 就是要求「全部都要是真的」才能為真。`);
Part.Part15 = Object.freeze(`@Ball:不只有boolean，還有其他的資料長相
        @Ball:例如不同的數字有不同的「資料長相」。`);
Part.Part16 = Object.freeze(`@Ball:整數類型：
        @Ball:int：可以儲存大多數情況下需要的整數
        @Ball:比如 int age = 15; 適合大部分場景。`);
Part.Part17 = Object.freeze(`@Ball:long：如果需要儲存非常大的整數
        @Ball:比如天文數字long population = 7800000000L;
        @Ball:記得在數字後加 L 表示它是 long。`);
Part.Part18 = Object.freeze(`@Ball:小數類型：
        @Ball:float：用來儲存小數，但精度不高
        @Ball:適合簡單運算：float price = 19.99F;
        @Ball:記得在數字後加 F，表示它是 float。`);
Part.Part19 = Object.freeze(`@Ball:double：如果需要很高精度
        @Ball:比如很多位小數double pi = 3.141592653589793;
        @Ball:double 的精度比 float 高，非常適合科學計算！`);
Part.Part20 = Object.freeze(`@Ball:每種資料類型都有各自適合的場合。
        @Ball:如果我要儲存一個人的年齡，用 int 就夠了
        @Ball:但如果是天文數字，或者超級精確的小數
        @Ball:就要用 long 或 double。`);
Part.Part21 = Object.freeze(`@Ball:還有一些比較冷門的資料長相。
        @Ball:雖然現在用得少，但它們是程式的基石。`);
Part.Part22 = Object.freeze(`@Ball:byte：能儲存的數字很小，因為現代電腦運算能力很強
        @Ball:實際上會自動轉成 int，所以一般不用。
        @Ball:例如：byte smallNumber = 100;`);
Part.Part23 = Object.freeze(`@Ball:short：能儲存的數字很小因為現代電腦運算能力很強
        @Ball:實際上會自動轉成 int，用途和 byte 類似
        @Ball:也很少單獨使用。short mediumNumber = 30000;`);
Part.Part24 = Object.freeze(`@Ball:char：用來儲存一個字元
        @Ball:包括鍵盤上能打出來的字，或者一些特殊符號。
        @Ball:必須用單引號 ' ' 包起來
        @Ball:比如：char letter = 'A';或char symbol = '#';
        @Ball:它其實儲存的是字元的 編碼值（比如 ASCII 或 Unicode）
        @Ball:所以也能表示一些鍵盤上打不出的特殊字：
        @Ball:char smiley = '\\u263A';
        @Ball:其實是Unicode 編碼，☺ 這樣就能儲存一個笑臉符號。`);
Part.Part25 = Object.freeze(`@Ball:數字類型像是 int、byte、short 等
        @Ball:也可以進行加減運算。
        @Ball:這就和數學一樣`);
Part.Part26 = Object.freeze(`@Ball:電腦也能根據我們的指令進行加法和減法。
        @Ball:比如說：int a = 0; a = a + 1; System.out.println(a); 
        @Ball:先告訴電腦要存a，a設定為0，計算a 加 1
        @Ball:然後再把計算結果存回 a，然後就能輸出 1。`);
Part.Part27 = Object.freeze(`@Ball:或者是減法int a = 0; a = a - 1; System.out.println(a); 
        @Ball:先告訴電腦要存a，a設定為0，計算a 減 1
        @Ball:然後再把計算結果存回 a，然後就能輸出 -1。
        @Ball:加法和減法很直覺`);
Part.Part28 = Object.freeze(`@Ball:還有乘法和除法都能照著數學規則來。
        @Ball:例如：int a = 2; a = a * 2; System.out.println(a); 
        @Ball:先告訴電腦要存a，a設定為2，計算a 乘2
        @Ball:然後再把計算結果存回 a，然後就能輸出 4。`);
Part.Part29 = Object.freeze(`@Ball:或者是除法：int a = 6; a = a / 3; System.out.println(a); 
        @Ball:先告訴電腦要存a，a設定為6，計算a 除以 3
        @Ball:然後再把計算結果存回 a，然後就能輸出 2。
        @Ball:這樣我們就能輕鬆地讓電腦幫我們做數學運算了。`);
Part.Part30 = Object.freeze(`@Ball:我們還可以簡寫：a = a + 5; 可以寫成 a += 5;。
        @Ball:a = a - 5; 可以寫成 a -= 5;。
        @Ball:a = a * 5;可以寫成 a *= 5;。
        @Ball:a = a / 5; 可以寫成 a /= 5;。
        @Ball:a += 1; 可以寫成a++。a -= 1; 可以寫成 a--。`);
Part.Part31 = Object.freeze(`@Ball:class 就像生物分類裡的「屬」
        @Ball:往上可以是「科、目、門」，代表更大的分類；
        @Ball:往下可以是「種」，代表更具體的個體。`);
Part.Part32 = Object.freeze(`@Ball:比如：假如有個 class 是 Animal（動物）
        @Ball:那它可能是「門」。`);
Part.Part33 = Object.freeze(`@Ball:再有個 class 是 Mammal（哺乳類）
        @Ball:它就可以是「綱」。`);
Part.Part34 = Object.freeze(` @Ball:最後有個 class Dog（狗）
        @Ball:它就到具體的「屬」或「種」了。`);
Part.Part35 = Object.freeze(`@Ball:這樣說，class 就是一種規劃出
        @Ball:「某種東西有什麼特徵」的框架！
        @Ball:但它不會馬上代表一隻具體的狗
        @Ball:而是說明了「狗應該有四隻腳、會叫，還會搖尾巴」
        @Ball:這些基本特徵。`);
