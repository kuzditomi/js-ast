function a() {
  c();
}

function b() {
  a();
}

function c() {
  a();
  b();
}

function d() {
  a();
  c();
}
