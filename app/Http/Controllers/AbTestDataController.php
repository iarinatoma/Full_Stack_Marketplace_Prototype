<?php

namespace App\Http\Controllers;

use App\Models\AbTestData;
//ia toate datele din model și returnează-le

class AbTestDataController extends Controller
{
    public function index()
    {
        return AbTestData::all(); //SELECT * FROM ab_testdata;
    }
}
