# React Context with Ant Design Table example

## The goal

The goal of this application is to demonstrate how to apply a common approach of working with tables ([Ant Design Table component](https://ant.design/components/table/), in particular) using [React Context](https://reactjs.org/docs/context.html).

## Overview

This application consists of two pages: Main and Associations.

### Main page

Being on `Main` page, user can see two tables: `Users` and `Colors` tables. User must choose one or several items in each table. After that the button `Next` become enabled. User clicks on the button and goes to `Associations` page.

### Associations page

Being on `Associations` page, user can see `Associations` table, where it is necessary to set one of the chosen previously colors to each chosen previously users. When all the user-color pairs are set, `Submit` button becomes enabled. User clicks on the button and can see the `Associations` table's data in JSON format below the button.
