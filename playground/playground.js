const students = [
  { name: "Nguyễn Văn A", age: 18, gender: "Nam", education: "THPT", hometown: "Hà Nội" },
  { name: "Trần Thị B", age: 19, gender: "Nữ", education: "Cao đẳng", hometown: "Hải Phòng" },
  { name: "Lê Văn C", age: 20, gender: "Nam", education: "Đại học", hometown: "Đà Nẵng" },
  { name: "Phạm Thị D", age: 18, gender: "Nữ", education: "THPT", hometown: "Nghệ An" },
  { name: "Hoàng Văn E", age: 21, gender: "Nam", education: "Đại học", hometown: "TP Hồ Chí Minh" }
];
students.sort((a, b) => a.age - b.age);
console.log(students);