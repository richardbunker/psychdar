<?php

namespace App\Http\Controllers;

use App\Models\AnchorGroup;
use Illuminate\Http\Request;

class AnchorGroupController extends Controller
{
    public function index($type)
    {
        return AnchorGroup::where('type', $type)->orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $newGroup = new AnchorGroup;
        $newGroup->name = $request->anchor_group["name"];
        $newGroup->type = $request->anchor_group["type"];
        $newGroup->anchors = json_encode($request->anchor_group["anchors"]);
        $newGroup->save();
        return response()->json("success!");
    }
}
