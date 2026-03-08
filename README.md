
    - 1️⃣ What is the difference between var, let, and const?
    Ans:
    1. var (The Old Way)
Scope: It is function-scoped. This means if you create it inside an if block or a for loop, it "leaks" out and can be used outside that block.

Changing values: You can update the value as many times as you want.

Redeclaring: You can accidentally create the same variable name twice in the same place without the code crashing, which often causes bugs.

Hoisting: You can actually use it before you define it (though it will just say undefined).

2. let (The Modern Way)
Scope: It is block-scoped. It stays strictly inside the { curly braces } where you created it. It won't leak out of an if statement or a loop.

Changing values: You can update or change the value whenever you need to.

Redeclaring: You cannot declare the same variable name twice in the same scope. The computer will stop you with an error.

Safety: Much safer than var because it prevents "ghost" variables from affecting other parts of your code.

3. const (The Fixed Way)
Scope: Also block-scoped (stays inside its { curly braces }).

Changing values: Once you give it a value, you cannot change it. It is a "constant."

Redeclaring: Just like let, you cannot create it twice in the same place.

Strictness: You must give it a value immediately when you create it; you can't leave it empty.


    - 2️⃣ What is the spread operator (...)?
    Ans:
    Spread operator (...) is used to expand elements of an array or properties of an object into individual elements. It is commonly used for copying, merging arrays or objects, and passing array elements as function arguments.


    - 3️⃣ What is the difference between map(), filter(), and forEach()?
    Ans:
    1. forEach() — The "Doer"
What it does: It simply executes a function for every element in the array.

Return value: It returns nothing (undefined).

Goal: Use it when you want to perform an "action" for every item, like logging data to the console, saving to a database, or updating a UI element.

Analogy: Imagine a row of lightbulbs; forEach is you walking down the row and clicking "On" for every single one.

2. map() — The "Transformer"
What it does: It takes an array, performs a calculation or change on every item, and creates a brand new array with those changes.

Return value: A new array of the exact same length as the original.

Goal: Use it when you want to transform data (e.g., doubling all numbers in a list or converting a list of names to uppercase).

Analogy: You put a tray of raw dough into an oven; map gives you back a tray of baked cookies. The original dough is gone (or unchanged if you saved it), and you have a new set of items.

3. filter() — The "Gatekeeper"
What it does: It checks every item against a condition (a test). If the item passes the test, it gets into the new array. If not, it’s left out.

Return value: A new array, usually shorter than the original (unless everything passes).

Goal: Use it when you want to remove unwanted items (e.g., getting only "Active" users or numbers greater than 10).

Analogy: You have a bag of mixed fruit; filter is you picking out only the apples and putting them into a new bowl.


    - 4️⃣ What is an arrow function?
    Ans:
    An arrow function is a shorter, more modern way to write functions in JavaScript. Introduced in ES6, it uses the "fat arrow" symbol (=>) and is much more concise than the traditional function keyword.

Here is what makes it different:

1. Shorter Syntax
With arrow functions, you can remove the function keyword and even the return keyword if the code is only one line.

Traditional: function(a, b) { return a + b; }

Arrow: (a, b) => a + b;

2. Implicit Return
If your function is just a single expression (one line), you don't need to write return. JavaScript automatically assumes you want to return the result of that line. This makes functions like map or filter look very clean.

3. No this Binding (The Big Difference)
This is the most important technical feature.

Regular functions have their own this context. Depending on how you call the function, this might refer to a button, the global window, or an object.

Arrow functions do not have their own this. They "inherit" this from the surrounding code (the lexical scope). This is incredibly helpful in React or when using timers (setTimeout), as you don't have to manually "bind" functions anymore.

4. Limitations
While they are great, there are a few things arrow functions cannot do:

Not for Constructors: You cannot use new with an arrow function to create an object.

No arguments object: They don't have the built-in arguments array that regular functions have.

Methods: Usually, they aren't used as methods inside objects if you need to access other properties of that same object using this.


    - 5️⃣ What are template literals?
Ans:
Template literals are a modern way to handle strings in JavaScript. Before they existed, joining text and variables together was a messy process of using quotes and plus signs (+).

Think of template literals as "smart strings" that allow you to plug variables directly into a sentence and handle multiple lines easily.

To use them, you don't use single (') or double (") quotes. Instead, you use backticks (`), which are usually found right below the Escape key.



