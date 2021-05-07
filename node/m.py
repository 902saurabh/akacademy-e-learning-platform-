n,p,w,d = map(int,input().split())
# wx + dy = p
x = 0
y = 0
gcd = -1
def ext_euclid(a,b):
  global x,y,gcd
  if b==0:
    y = 0
    x = p//a
    gcd = a
    
    return 
  ext_euclid(b,a%b)
  x_ = x
  y_ = y
  x = y_
  y = x_ - (a//b)*y_
  
ext_euclid(w,d)
if x<0 or y<0:
  print(-1)
else:
  print(x,y,abs(n-(x+y)))


  