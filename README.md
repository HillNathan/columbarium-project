# The Mary Hare Taylor Knight Memorial Columbarium <br> - Management Portal
 * Developing a working map and back-end management system for a small columbarium. 
<hr> 
<img src="https://www.stmartinec.org/uploads/images/20200611-columbarium-cross-after-1a-square_303_medium.jpg" 
    style="height: 200px; width: 200px; float:right"/>
<h3>    
"The Mary Hare Taylor Knight Memorial Columbarium on St. Martin’s grounds, is available for those who plan to be cremated. This beautiful, sacred space is tucked between the sanctuary and attached Mary Chapel, on a quiet, inside portion of our grounds. Lovingly maintained by volunteer gardeners and landscapers, as well as our sexton, this is an enduring place for your family and friends to return to for comfort and memory."
 
<a href="https://www.stmartinec.org/columbarium/"> - Church website</a>
 <br><br><br>
 </h3>

<hr>
<br>
Until recently, the management of the Mary Hare Taylor Knight Memorial Columbarium had been done exclusively on paper. This was changed when the columbarium celebrated an anniversary, and some of the information stored in books was transferred to several Excel documents. I was asked to help modernize the process of viewing the plots with a visual tool that could be public-facing, as well as designing a management portal that could be used by the church administration to help maintain accurate records for the organization. 

Using mySQL I built a database to help maintain the data going forward, as well as manage any new additions to the memorial garden. Using a Create-React-App shell and style and components from material-ui I built a front-end and pulled colors from the primary Saint Martin's website to make sure my colors and font's matched the main site, so that anyone visiting this columbarium tool would feel like this is an extension of the main website. I found a really nice interactive map tool that allowed me to put zooming and dragging onto the map so it behaved like a Google Map-like interface, and I color coded the squares for each item in the map and included a drawer menu with a legend. 
<p>
<img src = "readme_images\Map.png">
<br>

There is a basic search tool to find via name or via plot number, and the plots have the ability to contain a picture, so that a picture of the headstone is viewable from within the tool. 

<table>
    <tr>
        <td style="align:center"> 
            <img src="readme_images\Plot_Search.png">
            <br>
            <i>Plot Search box</i>
        </td>
    </tr>
<hr>
    <tr>
        <td style="align:center"> 
            <img src="readme_images\Name_Search.png">
            <br>
            <i>Name Search box</i>
        </td>
    </tr>
    <tr>
        <td style="align:center"> 
            <img src="readme_images\Plot_Info.png"> 
            <br>
            <i>Example Plot view box</i>
        </td>
    <tr>
</table>
<P>
<hr>
<p>
I also built a management portal behind a secure login. This management portal gives access to two different levels of user, basic and admin. Basic users have access to update most of the information on the usable plots for management purposes. The admin user will have access to change all information on each plot, so that if un-usable space needs to be converted into usable space in the future, an admin user will be able to update that information within the database. 
<p>
This portal gives the organization the ability to manage the entire process from start to finish. I set up a button for plots that are available so that a reservation can be initiated right from the plot map. This updates the database immediately, and opens up a new windot to a JotForm that can be filled out with all the appropriate information for a new reservation. This form was set up by the organization, and is not part of my build. 
<br>
<table>
    <tr>
        <td style="align:center"> 
            <img src="readme_images\Admin_Portal.png"> 
            <br>
            <i>Admin Portal Plot Editor</i>
        </td>
    <tr>
</table>
<hr>
The admin portal also gives the admin user the ability to create and manage users, including password resets, admin access, and removing users from the system. This will allow a consistent management structure from within the organization, as well as being able to provide with portal access to help manage the process across multiple levels of the organization. 
<br>
<table>
    <tr>
        <td style="align:center"> 
            <img src="readme_images\User_Portal.png"> 
            <br>
            <i>Admin Portal User Editor</i>
        </td>
    <tr>
</table>

