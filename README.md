# React Bootstrap admin starter template

<!-- To do  --



-->

<!---Changes which I think to be implemented To do ---

1. show all the transaction of aya and customer
    1.1 like which aya have been assigned from starting in the form table
    1.2 their transaction history

2. update the table of customer list with more details ✅

3. in the table of aya list, their will be one more column for to check , whether aya is assigned? ✅
    3.1 also their will be one more column to know the rate of aya
    3.2 days left for the aya, add one more column
    3.3 location column one more
    3.4 change aya code like customer code  ✅
    3.5 name of customer assigned to aya ✅
    3.6 status of payment, due or paid 

4 remove gender column from aya payment
    4.1 add remaiining column

5 remove  customer payment , column of guardian name
    5.1 add remaining money to take from customer add one column

6 updTE THE Table with mui table to enable sorting and filter  ✅

7 when going to edit the aya assign page, then it should show, which customer is assigned to them
    7.1 also in front of customer their should be one button, name as change , which redirect to change ayaassigned to customer
    7.2 also put one button which redirect to assigned customer and payment received

8 give option to update image in both customer and aya

9 PER MONTH PROFIT AND OVERALL PROFIT

10 in generate bill we can show all customer and aya assigned



  -->

<!-- --------SMALL Doubts ---------

aya assigned not cleared some point like

1.like agr aya assigned nhi hua hai to, aya ko assign kr do
ab jab nayi aaya ko assign krna hai tb, pooch lo, previous aaya ko rkhna hai ya nhi
agr rkhna hai to usi ke hisaab se ending date set kr do , us aaya ka
bas phir show kr do, ki kon kon se aaya aaigned hai kis kis customer ko
 
2 . ismein ek or case ban skta hai ki, agr koi aya aise nhi hai jo day night ke liye kaam kr rhi
to uske liye hmhe customer ko ek se adhik assign krna hoga 

 -->


<!-- Bugs👇 ----

1 .create a check such that, when we generate bill, it should only be generated , when all the entries 
are filled.

2. entries are coming in reverse, correct it ✅
 
3. when aya are deleting then it should not show assigned to anyone ✅
    

 -->


## screenshots

Loading Effect
![Login page screenshot](/screenshots/loading.png)

Login page screenshot
![Login page screenshot](/screenshots/login.png)

Forgot password page screenshot
![Forgot password page screenshot](/screenshots/forgot-password.png)

Dashboard page screenshot
![Dashboard page screenshot](/screenshots/dashboard.png)

Left modal page screenshot
![Left modal page screenshot](/screenshots/left-modal.png)

Right modal page screenshot
![Right modal page screenshot](/screenshots/right-modal.png)

Table page screenshot
![Table page screenshot](/screenshots/table.png)

Profile page screenshot
![Profile page screenshot](/screenshots/profile.png)

Change Password page screenshot
![Change Password page screenshot](/screenshots/change-password.png)

Blank Admin page screenshot
![Blank Admin page screenshot](/screenshots/blank-page.png)

## Prerequisite

-   Html
-   Css
-   Javascript
-   ReactJs

## Stuck somewhere ?

I am using bootstrap and react js here. So if you got stuck anywhere, please look [ReactJs](https://reactjs.org/docs/getting-started.html) and [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction) Docs.

## Steps for how you can start using this template: 

##### clone our respository

##### npm install

##### npm start

And you can start making an awesome admin application now.


<!-- changes to do -- 

1 . Dashboard
    1.1 in dashboard here we have to show the total customer with their payment status,

2. excehange of dat awhen assigning to one ✅

3. customer can visit aya , and aya can visit customer ✅

4. show assign aya , and assign customer when no one is assigned ✅

5. show go to generate bill when no one is bill is generated 

6. in generate bill create one more column for edit the information of that index

7. for total available nanny for work we can do, which is taking rest we can set current active status and then keep counter, or keep counting 

8. for total customer bill, we can add recently how much bill is generated for and then we can show the total sum of that

9. for a security money we can add all  security money

10. total amount received  from customer we can add all the amount received from customer

11. for total aya payment, we can again do same thing

12. in aya payment, add more column for total money paid , and amount remaining

13. add new customer is not working , check it out ✅

14. remove aya and customer functionality is not added

15. so in customer payment what we have to do here is, receive the amount update ✅

16. sabse phle 


 <!-- changes completed
 
 1. tabel updated with filter
 2. required filled in add customer and add aya , correect present check address

 3. delete confirmation is remaining
 4. update profile is remaining

 5. print table button completed 

 6 . fetching of ayaassign and customerassign is done

 7. exchange of ayaassignedDetails and assignedCustomerDetails is remaining

 8. api fetched for customer and aya, for payment


  -->


  <!-- 
  
  1. delete aya , or custoemer then it should first give alert message , are you sure, then remove that aya
  2.  and remove from the customer to blank to whom aya was assigned

  3. day-night , ismein kya hai ki , 

  4. when we, create customer code then, we are generating it from previous recrods, and if it is
  deleted then the, customer again keep hold of previous code 
    4.1 so you can do something to keep pointer and always assigned value next, so that it donn't repeat

  5. ismein jab replace kr rhe hai toh, aya ke bhi side se update ho jana chahiye ki, banda assign hua hai from, to date and purpose and rate

    
  


   -->


   <!-- what remaining complete it by today
   
   1. in custoomer list when the customer is replaced, then the overall structure ofassignedAyaDetails, is distorted, don't know why?  ✅

   2. in payment section , show which customer bill is not generated ✅

   3. then in the payment view, give update, read , and delete functionality, both for aya and customer

   4. then show the admin profit on the basis of generated bill of any customer or aya, 
   when generated then the admin profit details get updated

   5. in the security money not given page, we can show the remaining balance remaining of customer ✅

   6. if the rate is wrong generated, then i have to give edit and delete option, in which the 
index will be shared and delete and edit api will run, for replace details and assigned details

   7. give option to generate bill for replaced aya

   8. can give customer for leave, if on leave, then show it is assigned

   8. admin dashboard






   
   <!-- miscellaneous
    
    1. try out to give CURD operation in asssignedayadetails
    2 . in customer list  and aya list
    3. in customer assign we can give print option 
    4. in payment also we can give print option , also all replacement should show
    5. their should be different page for aya bill and customer bill
    -->
   
    
    