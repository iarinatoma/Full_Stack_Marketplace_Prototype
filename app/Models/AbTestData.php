<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AbTestData extends Model
{
    protected $table = 'ab_testdata';

    public $timestamps = false;

    //names of the attributes
    protected $fillable = [
        'id',
        'ab_testname'
    ];
}

//+ am introdus dataele 1,fotokamera si 2,blitzlicht
// after this laravel takes the result and transforms it into JSON
// and shows it ()if we open (http://127.0.0.1:8000)
