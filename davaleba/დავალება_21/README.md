# The Planets — კომპონენტებად დაშლილი ვერსია

ეს ვერსია არ საჭიროებს npm-ს ან ინსტალაციას — უბრალოდ გახსენი `index.html` ბრაუზერში.

## ფაილების სტრუქტურა

- `index.html` — გვერდი, რომელიც აერთიანებს ყველა ფაილს
- `style.css` — გაფორმება
- `data.js` — პლანეტების მონაცემები (`window.planets`)
- `components/Navbar.js` — ზედა მენიუ
- `components/TabButtons.js` — Overview / Internal Structure / Surface Geology ღილაკები
- `components/StatsBar.js` — ქვედა 4 სტატისტიკური ველი
- `components/App.js` — მთავარი კომპონენტი, აერთიანებს ყველა დანარჩენს, აქვს state
- `main.js` — App-ის დამონტაჟება გვერდზე

თითოეული კომპონენტი `window.ComponentName`-ზეა მიმაგრებული (მაგ. `window.Navbar`), რადგან build tool-ის (Vite/webpack) გარეშე ბრაუზერს ES მოდულების `import`/`export` არ სჭირდება — ეს არის ყველაზე მარტივი გზა, კომპონენტების ერთმანეთისგან განცალკევებით რომ იმუშაონ პირდაპირ ბრაუზერში.
