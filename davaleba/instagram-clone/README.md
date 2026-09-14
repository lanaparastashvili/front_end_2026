# Instagram Clone

ეს არის Instagram-ის კლონი, რომელიც ავაწყე React-ის გამოყენებით. პროექტში შევეცადე Instagram-ის ძირითადი დიზაინის და ფუნქციების გადმოტანა.

პროექტში შესაძლებელია Login, პოსტების ნახვა და Like, კომენტარების დაწერა, Stories-ის ნახვა, Reels-ის დათვალიერება, მესიჯების გაგზავნა, პროფილის რედაქტირება და სხვა.

## 🛠️ გამოყენებული ტექნოლოგიები

* React
* TypeScript
* Tailwind CSS
* JavaScript
* LocalStorage
* Lucide React Icons

## ✨ ძირითადი ფუნქციები

### 🔐 Login

* Username და Password-ით შესვლა
* Password-ის ჩვენება/დამალვა
* 1-Click Demo Login
* მომხმარებლების შენახვა LocalStorage-ში
* მიმდინარე მომხმარებლის და authentication token-ის შენახვა

### 📱 Stories

* Stories-ის ჰორიზონტალური ლენტი
* საკუთარი Story-ის დამატების ღილაკი
* ნანახი და უნახავი Story-ების განსხვავებული დიზაინი
* Story Viewer
* Story-ის ავტომატური გადასვლა შემდეგზე
* Pause ფუნქცია დაჭერისას
* წინა და შემდეგ Story-ზე გადასვლა

### 🖼️ Posts

* პოსტების ნახვა
* Like და Double-Tap Like
* Like-ის ანიმაცია
* კომენტარების დამატება
* პოსტების შენახვა Saved-ში
* Share ფუნქცია
* პოსტის დეტალურად გახსნა
* Caption-ის გაშლა

### 💬 Comments

* კომენტარის დამატება
* სწრაფი Emoji-ების გამოყენება
* კომენტარების ნახვა
* საკუთარი კომენტარის წაშლა
* კომენტარების რაოდენობის განახლება

### ➕ Create Post

ახალი პოსტის შექმნა რამდენიმე ეტაპად არის გაკეთებული:

1. ფოტოს არჩევა ან ატვირთვა
2. Crop და Filter
3. Caption, Emoji და Location

ფოტოს ასატვირთად გამოყენებულია `FileReader`, ხოლო ფილტრები გაკეთებულია CSS-ის `filter` property-ის გამოყენებით.

ხელმისაწვდომია რამდენიმე ფილტრი, მაგალითად:

* Clarendon
* Gingham
* Juno
* Moon
* და სხვა

ფილტრები ფოტოს რეალურად არ ცვლიან — CSS-ის საშუალებით იცვლება მისი ვიზუალური ეფექტი.

### 🔎 Explore

* პოსტების Grid განლაგება
* 3 სვეტი
* ზოგიერთი დიდი 2x2 ფოტო
* Hover ეფექტები
* Like და Comment რაოდენობების ჩვენება
* Search ფუნქცია
* პოსტის დეტალური Modal

### 🎬 Reels

* ვერტიკალური ვიდეოები
* Like
* Comment
* Share
* Save
* Follow
* ხმის ჩართვა/გამორთვა
* მუსიკის სახელის ჩვენება
* მუსიკალური დისკის ანიმაცია
* Reels-ზე ზემოთ/ქვემოთ გადასვლა

### ✉️ Direct Messages

* დიალოგების სია
* Online სტატუსი
* შეტყობინებების გაგზავნა
* Quick Heart
* Typing ინდიკატორი
* ავტომატური პასუხის სიმულაცია

ავტო-პასუხისთვის გამოყენებულია `setTimeout`, რის შემდეგაც დაახლოებით 1.5 წამში ჩნდება პასუხი.

### 👤 Profile

* Profile-ის ინფორმაცია
* Avatar
* Username
* Bio
* Website
* Posts / Followers / Following
* Story Highlights
* Posts, Reels, Saved და Tagged ტაბები
* Followers და Following-ის ნახვა
* Follow / Unfollow
* Edit Profile

პროფილის რედაქტირებისას შესაძლებელია:

* სახელის შეცვლა
* Bio-ს შეცვლა
* Website-ის შეცვლა
* ახალი Avatar-ის ატვირთვა

### 🔍 Search & Notifications

* მომხმარებლების და პოსტების ძებნა
* Live Search
* Recent Searches
* Recent Searches-ის წაშლა
* Notifications
* Like / Comment / Follow აქტივობების ჩვენება
* Notification-იდან Follow-ის გაკეთება

### 🌓 Dark / Light Mode

პროექტში დამატებულია Dark და Light Mode.

თემის სამართავად გამოვიყენე React Context API და Tailwind CSS-ის `dark:` კლასები.

არჩეული თემა ინახება LocalStorage-ში, ამიტომ გვერდის გადატვირთვის შემდეგაც იგივე თემა რჩება.

### 📱 Responsive Design

პროექტი გაკეთებულია Desktop-ის და Mobile-ისთვის.

Desktop-ზე გვაქვს:

* Sidebar
* სრული ნავიგაცია
* ძირითადი გვერდები

Mobile-ზე:

* Mobile Header
* Mobile Navigation
* ქვედა მენიუ
* ადაპტირებული პოსტები და სხვა კომპონენტები

Responsive დიზაინისთვის გამოყენებულია Tailwind CSS-ის breakpoint-ები, მაგალითად `md:` და `lg:`.

## 📂 პროექტის სტრუქტურა

```text
src/
├── components/
│   ├── drawers/
│   ├── feed/
│   ├── modals/
│   └── stories/
│
├── context/
│   └── ThemeContext.tsx
│
├── pages/
│   ├── AuthPage.tsx
│   ├── ExplorePage.tsx
│   ├── MessagesPage.tsx
│   ├── ProfilePage.tsx
│   └── ReelsPage.tsx
│
├── services/
│   └── api.ts
│
└── ...
```

## 💾 მონაცემების შენახვა

პროექტში მონაცემების შესანახად გამოვიყენე **LocalStorage**.

მაგალითად, იქ ინახება:

* `ig_users` — მომხმარებლები
* `ig_current_user` — მიმდინარე მომხმარებელი
* `ig_auth_token` — ავტორიზაციის ინფორმაცია
* `ig_theme` — არჩეული თემა

ამიტომ ზოგიერთი მოქმედება გვერდის Refresh-ის შემდეგაც ინარჩუნებს მდგომარეობას.

## 🎯 პროექტის მიზანი

პროექტის მთავარი მიზანი იყო React-ის ცოდნის პრაქტიკაში გამოყენება და უფრო დიდი, მრავალფუნქციური აპლიკაციის აწყობა.

ამ პროექტზე მუშაობისას პრაქტიკაში გამოვიყენე:

* React Components
* State და Props
* Context API
* TypeScript
* Tailwind CSS
* LocalStorage
* CSS Animations
* Responsive Design
* `setInterval`
* `setTimeout`
* `FileReader`
* Array მეთოდები, მაგალითად `map()` და `filter()`

## 🚀 გაშვება

პროექტის გასაშვებად:

```bash
npm install
```

შემდეგ:

```bash
npm run dev
```

ამის შემდეგ პროექტი გაეშვება ლოკალურ development server-ზე.

## 👩‍💻 ავტორი

**Lana Parastashvili**

React / TypeScript / Tailwind CSS პროექტი
